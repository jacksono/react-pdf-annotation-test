zimba:

	@ docker build -t demo2 .

tandika:
	@ echo "Starting the app"
	@ docker run -p 3000:3000 -d jacksononyango/learningdocker
	@ echo "The app is now running on port 3000"
