# Flask API Starter Kit

Sample API layout structure to be used as a baseline for other apps

## Dependencies

- [flask](https://palletsprojects.com/p/flask/): Python server of choise
- [flasgger](https://github.com/flasgger/flasgger): Used to generate the swagger documentation
- [flask-marshmallow](https://flask-marshmallow.readthedocs.io/en/latest/): My favourite serializer
- [apispec](https://apispec.readthedocs.io/en/latest/): Required for the integration between marshmallow and flasgger

## Set Up

If we have dependency issues we can move to poetry down the line

1. Check out the code
2. Install requirements (poetry install)
    Create a virtualenv
    pip install -r requirements.txt
3. Start the server with:
    ```
   flask run
    ```
   
4. Visit http://localhost/api for the home api

4. Visit http://localhost/apidocs for the swagger documentation
   
## Tests

The code is covered by tests, to run the tests please execute

```

```