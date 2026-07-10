// Data layer for Roasted Bean Roastery

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    tags?: string[];
    image?: string; // Optional image URL for menu items
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    rating: number;
    quote: string;
}

export interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    hours: {
        weekday: string;
        saturday: string;
        sunday: string;
    };
    mapLink: string;
}

export interface Socials {
    instagram: string;
    facebook: string;
    twitter: string;
    email: string;
}

// 1. Menu items grouped by category
export const menuData: Record<string, MenuItem[]> = {
    espresso: [
        {
            id: "latte",
            name: "Latte",
            description: "Double shot of our house espresso with silky micro-foam steamed milk.",
            price: 4.50,
            image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "cappuccino",
            name: "Cappuccino",
            description: "Equal parts espresso, steamed milk, and dense airy foam. Traditional 6oz.",
            price: 4.25,
            image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "flat_white",
            name: "Flat White",
            description: "Velvety micro-foam poured over a double ristretto for a rich, coffee-forward taste.",
            price: 4.75,
            image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "americano",
            name: "Americano",
            description: "Double shot of house espresso diluted with filtered hot water. Crisp and clean.",
            price: 3.75,
            image: "https://images.unsplash.com/photo-1551046710-7e2cf0788ad6?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "macchiato",
            name: "Macchiato",
            description: "Double shot of espresso marked with a small dollop of steamed micro-foam milk.",
            price: 4.00,
            image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "mocha",
            name: "Mocha",
            description: "Rich espresso combined with dark chocolate syrup, steamed milk, and whipped cream.",
            price: 5.25,
            image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "cortado",
            name: "Cortado",
            description: "Double shot of espresso cut with an equal amount of warm steamed micro-foam milk.",
            price: 4.25,
            image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "affogato",
            name: "Affogato",
            description: "Double shot of espresso poured over a scoop of artisanal vanilla bean gelato.",
            price: 5.50,
            image: "https://images.unsplash.com/photo-1594911774802-8822a707caff?w=600&auto=format&fit=crop&q=80"
        }
    ],
    pour_over: [
        {
            id: "ethiopian",
            name: "Ethiopian Yirgacheffe",
            description: "Light roasted with vibrant acidity and jasmine notes. Clean, tea-like finish.",
            price: 6.50,
            tags: ["Citrus", "Floral"],
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "colombian",
            name: "Colombian Supremo",
            description: "Medium roast. Balanced body with notes of toasted almond and dark cocoa.",
            price: 5.50,
            tags: ["Nutty", "Chocolate"],
            image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "kenyan",
            name: "Kenyan AA",
            description: "Light-medium roast. Bold blackcurrant and grapefruit notes with a complex winey acidity.",
            price: 6.75,
            tags: ["Fruity", "Winey"],
            image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80"
        }
    ],
    pastries: [
        {
            id: "almond_croissant",
            name: "Almond Croissant",
            description: "Twice-baked with house-made frangipane and sliced almonds.",
            price: 5.25,
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "blueberry_muffin",
            name: "Blueberry Muffin",
            description: "Bursting with fresh wild blueberries and a lemon-zest crumble top.",
            price: 4.50,
            image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "cinnamon_roll",
            name: "Cinnamon Roll",
            description: "Warm, fluffy pastry swirled with brown sugar cinnamon and glazed with cream cheese frosting.",
            price: 4.75,
            image: "https://images.unsplash.com/photo-1509420063183-30d8a1173cf7?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "chocolate_croissant",
            name: "Chocolate Croissant",
            description: "Flaky butter croissant rolled with double bars of rich semi-sweet Belgian chocolate.",
            price: 5.00,
            image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "butter_croissant",
            name: "Butter Croissant",
            description: "Traditional French pastry made with layers of butter, baked to a golden brown.",
            price: 4.00,
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "lemon_scone",
            name: "Lemon Poppy Seed Scone",
            description: "Crumbly scone baked with organic poppy seeds and finished with a sweet lemon glaze.",
            price: 4.50,
            image: "https://images.unsplash.com/photo-1587960389599-77a6f7881c0a?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "banana_bread",
            name: "Vegan Banana Bread",
            description: "Moist banana bread slice loaded with walnuts and dark chocolate chips. Vegan friendly.",
            price: 4.25,
            image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600&auto=format&fit=crop&q=80"
        }
    ]
};

// 2. Testimonials data list
export const testimonialsData: Testimonial[] = [
    {
        id: "t1",
        name: "Sarah Jenkins",
        role: "Coffee Aficionado",
        rating: 5,
        quote: "The Lavender Honey Latte is a revelation. Subtle, floral, not overly sweet, and poured with incredible micro-foam."
    },
    {
        id: "t2",
        name: "David Kross",
        role: "Local Barista",
        rating: 5,
        quote: "The small-batch difference is obvious in every single cup. Their Colombian Supremo pour-over is roasted to absolute perfection."
    },
    {
        id: "t3",
        name: "Emma Lind",
        role: "Neighborhood Regular",
        rating: 5,
        quote: "Incredible pastries and the warmest atmosphere. I spend almost every Saturday morning reading near the window with a flat white."
    },
    {
        id: "t4",
        name: "Marcus Thorne",
        role: "Artisanal Chef",
        rating: 5,
        quote: "Their direct-trade relationships translate directly into the quality of the cup. Outstanding traceability and flavor profiles."
    }
];

// 3. Store Branch locations
export const branchesData: Branch[] = [
    {
        id: "b1",
        name: "Artisan District (Roastery)",
        address: "124 Artisan Way, Coffee District, Cityville",
        phone: "(555) 123-4567",
        email: "artisan@roastedbean.com",
        hours: {
            weekday: "7:00 AM - 6:00 PM",
            saturday: "8:00 AM - 6:00 PM",
            sunday: "8:00 AM - 4:00 PM"
        },
        mapLink: "https://maps.google.com/?q=124+Artisan+Way+Cityville"
    },
    {
        id: "b2",
        name: "Downtown Plaza",
        address: "450 Commerce Blvd, Suite 10, Downtown, Cityville",
        phone: "(555) 987-6543",
        email: "downtown@roastedbean.com",
        hours: {
            weekday: "6:00 AM - 7:00 PM",
            saturday: "7:00 AM - 5:00 PM",
            sunday: "Closed"
        },
        mapLink: "https://maps.google.com/?q=450+Commerce+Blvd+Cityville"
    },
    {
        id: "b3",
        name: "East Canal Workshop",
        address: "88 Industrial Rd, East Canal, Cityville",
        phone: "(555) 234-5678",
        email: "canal@roastedbean.com",
        hours: {
            weekday: "8:00 AM - 4:00 PM",
            saturday: "8:00 AM - 4:00 PM",
            sunday: "Closed"
        },
        mapLink: "https://maps.google.com/?q=88+Industrial+Rd+Cityville"
    }
];

// 4. Social links & global contact
export const socialsData: Socials = {
    instagram: "https://instagram.com/roastedbean",
    facebook: "https://facebook.com/roastedbean",
    twitter: "https://twitter.com/roastedbean",
    email: "hello@roastedbean.com"
};
