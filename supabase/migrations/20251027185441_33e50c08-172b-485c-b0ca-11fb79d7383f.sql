-- Create enum for vehicle status
CREATE TYPE public.vehicle_status AS ENUM ('available', 'sold', 'reserved');

-- Create enum for vehicle category
CREATE TYPE public.vehicle_category AS ENUM ('sedan', 'suv', 'coupe', 'roadster', 'hatchback');

-- Create enum for fuel type
CREATE TYPE public.fuel_type AS ENUM ('gasoline', 'diesel', 'electric', 'hybrid', 'flex');

-- Create enum for transmission type
CREATE TYPE public.transmission_type AS ENUM ('manual', 'automatic', 'semi-automatic');

-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  category public.vehicle_category NOT NULL,
  status public.vehicle_status NOT NULL DEFAULT 'available',
  kilometers INTEGER,
  transmission public.transmission_type NOT NULL,
  fuel public.fuel_type NOT NULL,
  description TEXT,
  main_image_url TEXT,
  image_urls TEXT[],
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sale submissions table
CREATE TABLE public.sale_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  version TEXT,
  kilometers INTEGER,
  desired_value TEXT,
  owner_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create consignment submissions table
CREATE TABLE public.consignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  version TEXT,
  kilometers INTEGER,
  desired_value TEXT,
  owner_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sale_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has a role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for vehicles (public can read, only admins can modify)
CREATE POLICY "Anyone can view available vehicles"
  ON public.vehicles
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert vehicles"
  ON public.vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update vehicles"
  ON public.vehicles
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete vehicles"
  ON public.vehicles
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for sale submissions (anyone can insert, only admins can view/delete)
CREATE POLICY "Anyone can submit sale forms"
  ON public.sale_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view sale submissions"
  ON public.sale_submissions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete sale submissions"
  ON public.sale_submissions
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for consignment submissions (anyone can insert, only admins can view/delete)
CREATE POLICY "Anyone can submit consignment forms"
  ON public.consignment_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view consignment submissions"
  ON public.consignment_submissions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete consignment submissions"
  ON public.consignment_submissions
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles (only admins can manage)
CREATE POLICY "Only admins can view user roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert user roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete user roles"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for vehicles table
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();