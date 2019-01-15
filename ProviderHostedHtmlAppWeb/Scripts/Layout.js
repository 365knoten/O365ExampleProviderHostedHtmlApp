var hostweburl;

//load the SharePoint resources
$(document).ready(function () {
    //Get the URI decoded URL.
    hostweburl =
        decodeURIComponent(
            getQueryStringParameter("SPHostUrl")
        );

    // The SharePoint js files URL are in the form:
    // app_web_url/_layouts/15/resource
    var scriptbase = hostweburl + "/_layouts/15/";

    // Load the js file and continue to the 
    //   success handler
    $.getScript(scriptbase + "SP.UI.Controls.js", renderChrome)
});

//Function to prepare the options and render the control
function renderChrome() {
    // The Help, Account and Contact pages receive the 
    //   same query string parameters as the main page
    var options = {
        "appIconUrl": hostweburl + "/_layouts/15/images/siteIcon.png",
        "appTitle": "Provider Hosted App",
        "appHelpPageUrl": "Help.html?"
            + document.URL.split("?")[1],
        "settingsLinks": [
            {
                "linkUrl": "Default.html?"
                    + document.URL.split("?")[1],
                "displayName": "Bacon"
            },
            {
                "linkUrl": "ListData.html?"
                    + document.URL.split("?")[1],
                "displayName": "ListData"
            }
        ]
    };

    var nav = new SP.UI.Controls.Navigation(
        "chrome",
        options
    );
    nav.setVisible(true);
}

// Function to retrieve a query string value.
// For production purposes you may want to use
//  a library to handle the query string.
function getQueryStringParameter(paramToRetrieve) {
    var params =
        document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}