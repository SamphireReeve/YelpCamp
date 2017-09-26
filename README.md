     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


RESTFUL ROUTES

name        url                     verb        desc.
===================================================================================
INDEX       /campgrounds                    GET     Display a list of all campgrounds
NEW         /campgrounds/new                GET     Displays form to make a new campground
CREATE      /campgrounds                    POST    Add new campground to DB
SHOW        /campgrounds/:id                GET     Shows info about one campground

NEW         /campgrounds/:id/comments/new   GET     Displays a form to make a new comment
CREATE      /campgrounds/:id/comments       POST    Add new comment to DB


