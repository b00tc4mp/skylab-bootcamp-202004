function turnToCountry(country){

    // String.validate.notVoid(country)
    String.validate(country)

    switch (country) {
        case 'International News':
            country = ""
            break;
        case 'ar':
            country = 1
            break;
        case 'at':
            country = 2
            break;
        case 'au':
            country = 3
            break;
        case 'br':
            country = 4
            break;
        case 'ca':
            country = 5
            break;
        case 'ch':
            country = 6
            break;
        case 'de':
            country = 7
            break;
        case 'fr':
            country = 8
            break;
        case 'gb':
            country = 9
            break;
        case 'hk':
            country = 10
            break;
        case 'ie':
            country = 11
            break;
        case 'it':
            country = 12
            break;
        case 'jp':
            country = 13
            break;
        case 'ma':
            country = 14
            break;
        case 'mx':
            country = 15
            break;
        case 'nz':
            country = 16
            break;
        case 'ph':
            country = 17
            break;
        case 'pt':
            country = 18
            break;
        case 'ru':
            country = 19
            break;
        case 'us':
            country = 20
            break;
        default:
            throw error
    }

    return country
}