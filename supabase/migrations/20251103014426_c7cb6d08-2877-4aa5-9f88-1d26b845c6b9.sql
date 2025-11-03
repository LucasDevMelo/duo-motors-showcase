-- Create storage bucket for vehicle images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vehicle-images', 'vehicle-images', true);

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload vehicle images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'vehicle-images');

-- Create policy to allow public access to view images
CREATE POLICY "Anyone can view vehicle images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'vehicle-images');

-- Create policy to allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update vehicle images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'vehicle-images');

-- Create policy to allow admins to delete vehicle images
CREATE POLICY "Admins can delete vehicle images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'vehicle-images' AND has_role(auth.uid(), 'admin'));