Elasticsearch Explorer
======================

A totally front-end browser for an elasticsearch database written with angular.
You can see it working at http://scalainc.github.io/es-explorer.

Running Locally
-------------
    git clone https://github.com/ScalaInc/es-explorer.git

The html, javascript and css within this project can be served statically however you want. If you have node and npm, I recommend

    sudo npm install -g http-server

Once that is installed, `cd` into the project directory and

    http-server -c-1

This should start a lightweight node server at http://localhost:8080.

To Do
-----
- When a row is clicked we'd like to open a modal or something that displays that document in json format, just like how elasticsearch-head works. I thought this would be easy but rendering a json object in html is non trivial, and the modal libraries I tried didn't work out the box with such a long string. For now I simply log the json object to the web inspector console which is good enough for developers but still not great.

- Create a pane for filters. Right now the only 'filter' is deviceToken, something hard coded for my own particular use case. Ideally we will allow you to customize everything, including server location, exact fields by which to sort, exactly which fields get a column in the table, and filters for those columns to only see the documents you want.

- Use local storage to "remember" the filter setting mentioned above between browser sessions. I don't think this will ever have persistence beyond that though, because I don't want to add a database layer to this app.
