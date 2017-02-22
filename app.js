//importing modules
var express = require( 'express' );
var request = require( 'request' );
var cheerio = require( 'cheerio' );

//creating a new express server
var app = express();

//setting EJS as the templating engine
app.set( 'view engine', 'ejs' );

//setting the 'assets' directory as our static assets dir (css, js, img, etc...)
app.use( '/assets', express.static( 'assets' ) );

function findURL(myURL)
{
    var request = require('request');
    request(myURL, function(error, response, body) {
        if( !error && response.statusCode == 200){
            console.log(body)
            $ = cheerio.load('$0')
            console.log($)
        }

    })
}

//makes the server respond to the '/' route and serving the 'home.ejs' template in the 'views' directory
app.get( '/', function ( req, res ) {
    callLeboncoin();

    res.render( 'home', function() { 
    });
});


//launch the server on the 3000 port
app.listen( 3000, function () {
    console.log( 'App listening on port 3000!' );
});

function callLeboncoin() {
    var url = 'https://www.leboncoin.fr/ventes_immobilieres/1087663393.htm?ca=12_s'

    request( url, function ( error, response, html ) {
        if ( !error && response.statusCode==200 ) {

            const $ = cheerio.load( html )

            const lbcDataArray = $( 'section.properties span.value' )

            let lbcData = {
                price: parseInt( $( lbcDataArray.get( 0 ) ).text().replace( /\s/g, '' ), 10 ),
                city: $( lbcDataArray.get( 1 ) ).text().trim().toLowerCase().replace( /\_|\s/g, '-' ),
                type: $( lbcDataArray.get( 2 ) ).text().trim().toLowerCase(),
                surface: parseInt( $( lbcDataArray.get( 4 ) ).text().replace( /\s/g, '' ), 10 )
            }
            console.log( lbcData )
        }
        else {
            console.log( 'error', error )
        }
    }
    )
}