export interface OfferGenerator {
    generate(): string
}

export enum WEEK_DAY {
    FIRST_WEEK_DAY = 1,
    LAST_WEEK_DAY = 7
}

export enum RATING {
    MIN_RATING = 0,
    MAX_RATING = 5,
    NUM_AFTER_DIGIT_FOR_RATING = 1
}

export enum ROOMS {
    MIN_NUMBER_OF_ROOMS = 1,
    MAX_NUMBER_OF_ROOMS = 5
}

export enum GUESTS {
    MIN_NUMBER_OF_GUESTS = 1,
    MAX_NUMBER_OF_GUESTS = 10
}

export enum PRICE {
    MIN_PRICE = 500,
    MAX_PRICE = 2000
}

export enum COMMENTS {
    MIN_NUMBER_OF_COMMENTS = 1,
    MAX_NUMBER_OF_COMMENTS = 1000
}
