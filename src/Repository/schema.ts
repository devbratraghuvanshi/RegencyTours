
import { mongoose } from './../dbConfig/db';
const Schema = mongoose.Schema;

export let FlightDetails = new Schema({
    included: Boolean,
    title: String,
    subtitle: String,
    onwardFlights: Schema.Types.Mixed,
    returnFlights: Schema.Types.Mixed
});

export let Hotel = new Schema({
    id: String,
    name: String,
    starRating: Number,
    rating: Number,
    cityName: String
});
export let HotelDetails = new Schema({
   hotels: [Hotel]
});

export let Activity = new Schema({
    title: String,
    subtitle: String,
    sightSeeingIncluded: Boolean,
    sightSeeingCount: Number,
    activities: [String]
});

export let Price = new Schema({
    price: Number,
    slashedPrice: Number,
    departureDiscount: Number,
    paxCount: Number,
    departureDate: Date,
    categoryId: Number
});
export let Tag = new Schema({
    tag: String,
    values: [String]
});

export let Deal = new Schema({
    recommendedCoupons: String,
    deals: [String]
});
export let Destination = new Schema({
    seqNo: Number,
    name: String,
    nights: Number
});
export let DestinationDetails = new Schema({
		count: Number,
		destinations: [Destination]
});

export let Image = new Schema({

				name: String,
				path: String,
				title: String
});
export let ImageDetails = new Schema({
                mainImage: Image,
				images: [Image]
});
export let Category = new Schema({
    id:Number,
    categories: String
});

export let CategoryDetails = new Schema({
    defaultCategoryId:Number,
    name: [Category]
});

export let packageSchema = new Schema({
    id: String,
    name: String,
    packageType: String,
    videoUrl: String,
    branch: String,
    depCityId: Number,
    flightDetails: FlightDetails,
    hotelDetails: HotelDetails,
    activityDetails: Activity,
    priceDetails: Price,
    tags: [Tag],
    dealDetails: Deal,
    destinationDetails: DestinationDetails,
    imageDetails: ImageDetails,
    categoryDetails: CategoryDetails,
    tagDestination: String,
    pkgCode: String,
    nights:Number
}, { collection: 'Packages' });





