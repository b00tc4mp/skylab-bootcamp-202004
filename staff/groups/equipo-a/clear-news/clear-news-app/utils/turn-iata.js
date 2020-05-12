function turnToIata(country){

    // String.validate.notVoid(country)
    String.validate(country)

    switch (country) {
        case 'International News':
            country = ""
            break;
        case 'Argentina':
            country = "ar"
            break;
        case 'Austria':
            country = "at"
            break;
        case 'Australia':
            country = "au"
            break;
        case 'Brasil':
            country = "br"
            break;
        case 'Canada':
            country = "ca"
            break;
        case 'China':
            country = "cn"
            break;
        case 'Germany':
            country = "de"
            break;
        case 'France':
            country = "fr"
            break;
        case 'Great Britain':
            country = "gb"
            break;
        case 'Hong Kong':
            country = "hk"
            break;
        case 'Irlanda':
            country = "ie"
            break;
        case 'Italy':
            country = "it"
            break;
        case 'Japan':
            country = "jp"
            break;
        case 'Marocco':
            country = "ma"
            break;
        case 'Mexico':
            country = "mx"
            break;
        case 'New Zealand':
            country = "nz"
            break;
        case 'Phillipines':
            country = "ph"
            break;
        case 'Portugal':
            country = "pt"
            break;
        case 'Russia':
            country = "ru"
            break;
        case 'United States of America':
            country = "us"
            break;
        default:
            throw error
    }

    return country
}