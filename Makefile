zimba:

	@ docker build -t jacksononyango/newimage .

tandika:
	@ echo "Starting the app"
	@ docker run -p 3000:3000 -d jacksononyango/newimage
	@ echo "The app is now running on port 3000"
