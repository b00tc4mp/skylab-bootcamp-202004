/* const token = "BQBoV7__CDAg_U-K1CCT2FSloGE32NtUmnHGx-pzB1_2Q7xT9jkyu4U-EUo0g9vqDVvRXitLIh33EHTJbndvqlHQ-rkOmxUFvUFP8RADZmOPbuo4ddrA-6DrpnId97z6C1R1KDhvyxkBahOloOrjhNJTMd4G9hjoZhfuYpVolh8yY5lp0pjNPgfq"

function searchAlbum(token) {

    call("GET", "https://api.spotify.com/v1/search?q=Midiendo%20el%20tiempo%20con%20canciones&type=album",undefined,
    {"Content-Type": "application/json","Authorization": `Bearer: ${token}`}, (error,status,body =>  {
        if (error) console.log(error)

        if (status === 200){
            const []
        }
    }))
       


}





{
    "albums": {
      "href": "https://api.spotify.com/v1/search?query=Midiendo+el+tiempo+con+canciones&type=album&offset=0&limit=20",
      "items": [
        {
          "album_type": "album",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7kxPb1odLovTWPlxdNwymj"
              },
              "href": "https://api.spotify.com/v1/artists/7kxPb1odLovTWPlxdNwymj",
              "id": "7kxPb1odLovTWPlxdNwymj",
              "name": "Ruidoblanco",
              "type": "artist",
              "uri": "spotify:artist:7kxPb1odLovTWPlxdNwymj"
            }
          ],
          "available_markets": [
            "AD",
            "AE",
            "AR",
            "BE",
            "BH",
            "BO",
            "BR",
            "CL",
            "CO",
            "CR",
            "CY",
            "DK",
            "DO",
            "DZ",
            "EC",
            "EG",
            "ES",
            "FI",
            "GB",
            "GR",
            "GT",
            "HN",
            "IE",
            "IL",
            "IN",
            "IS",
            "IT",
            "JO",
            "KW",
            "LB",
            "LU",
            "MA",
            "MC",
            "MT",
            "NI",
            "NL",
            "NO",
            "OM",
            "PA",
            "PE",
            "PT",
            "PY",
            "QA",
            "SA",
            "SE",
            "SV",
            "TN",
            "TR",
            "UY",
            "ZA"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/5jWJbQTex5CozS56aYggpp"
          },
          "href": "https://api.spotify.com/v1/albums/5jWJbQTex5CozS56aYggpp",
          "id": "5jWJbQTex5CozS56aYggpp",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b273509d95b43b471a406a7ca629",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e02509d95b43b471a406a7ca629",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d00004851509d95b43b471a406a7ca629",
              "width": 64
            }
          ],
          "name": "Midiendo el tiempo con canciones",
          "release_date": "2011-10-07",
          "release_date_precision": "day",
          "total_tracks": 12,
          "type": "album",
          "uri": "spotify:album:5jWJbQTex5CozS56aYggpp"
        },
        {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7kxPb1odLovTWPlxdNwymj"
              },
              "href": "https://api.spotify.com/v1/artists/7kxPb1odLovTWPlxdNwymj",
              "id": "7kxPb1odLovTWPlxdNwymj",
              "name": "Ruidoblanco",
              "type": "artist",
              "uri": "spotify:artist:7kxPb1odLovTWPlxdNwymj"
            }
          ],
          "available_markets": [
            "ES"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3bpzY9MpFkVQUpWG8kGBG2"
          },
          "href": "https://api.spotify.com/v1/albums/3bpzY9MpFkVQUpWG8kGBG2",
          "id": "3bpzY9MpFkVQUpWG8kGBG2",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b27343e4ff410f17afb1cd51ec42",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e0243e4ff410f17afb1cd51ec42",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d0000485143e4ff410f17afb1cd51ec42",
              "width": 64
            }
          ],
          "name": "Midiendo el tiempo con canciones (Avance Spotify)",
          "release_date": "2011-10-11",
          "release_date_precision": "day",
          "total_tracks": 5,
          "type": "album",
          "uri": "spotify:album:3bpzY9MpFkVQUpWG8kGBG2"
        }
      ],
      "limit": 20,
      "next": null,
      "offset": 0,
      "previous": null,
      "total": 3
    }
  } */