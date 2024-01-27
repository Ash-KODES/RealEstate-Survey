export const questions = [
  {
    type: "text-radio",
    choices: [
      "18-19 years",
      "20-29 years",
      "30-39 years",
      "40-49 years",
      "50-59 years",
      "65+",
    ],
    text: "What is your Age?",
  },
  {
    type: "text-radio",
    choices: ["male", "female", "Non-binary", "Prefer not to answer"],
    text: "What is your gender?",
  },
  {
    type: "text-scroll",
    choices: [
      "Chief Executives, General Managers and Legislators",
      "Farmers and Farm Managers",
      "Specialist Managers",
      "Hospitality, Retail and Service Managers",
      "Arts and Media Professionals",
      "Business, Human Resource and Marketing Professionals",
      "Design, Engineering, Science and Transport Professionals",
      "Education Professionals",
      "Health Professionals",
      "ICT Professionals",
      "Legal, Social and Welfare Professionals",
      "Engineering, ICT and Science Technicians",
      "Automotive and Engineering Trades Workers",
      "Construction Trades Workers",
      "Electrotechnology and Telecommunications Trades Workers",
      "Food Trades Workers",
      "Skilled Animal, Agricultural and Horticultural Workers",
      "Other Technicians and Trades Workers",
      "Health and Welfare Support Workers",
      "Carers and Aides",
      "Hospitality Workers",
      "Protective Service Workers",
      "Sports and Personal Service Workers",
      "Office Managers and Program Administrators",
      "Personal Assistants and Secretaries",
      "General Clerical Workers",
      "Inquiry Clerks and Receptionists",
      "Numerical Clerks",
      "Clerical and Office Support Workers",
      "Other Clerical and Administrative Workers",
      "Sales Representatives and Agents",
      "Sales Assistants and Salespersons",
      "Sales Support Workers",
      "Machine and Stationary Plant Operators",
      "Mobile Plant Operators",
      "Road and Rail Drivers",
      "Storepersons",
      "Cleaners and Laundry Workers",
      "Construction and Mining Labourers",
      "Factory Process Workers",
      "Farm, Forestry and Garden Workers",
      "Food Preparation Assistants",
      "Other Labourers",
    ],
    text: "What is your occupation?",
  },
  {
    type: "text-scroll",
    choices: [
      "$1-$7,799",
      "$7,800-$15,599",
      "$15,600-$20,799",
      "$20,800-$25,999",
      "$26,000-$33,799",
      "$33,800-$41,599",
      "$41,600-$51,999",
      "$52,000-$64,999",
      "$65,000-$77,999",
      "$78,000-$90,999",
      "$91,000-$103,999",
      "$104,000-$129,999",
      "$130,000-$155,999",
      "$156,000-$181,999",
      "$182,000-$207,999",
      "$208,000-$233,999",
      "$234,000-$259,999",
      "$260,000-$311,999",
      "$312,000-$415,999",
      "$416,000 or more",
    ],
    text: "Annual Household Income:",
  },
  {
    type: "text-scroll",
    choices: [
      "No formal education",
      "Primary school",
      "Some high school",
      "High school graduate",
      "Trade or vocational qualification",
      "Associate degree",
      "Bachelor's degree",
      "Graduate or Masters Degree",
      "Other (please specify)",
      "Prefer not to answer",
    ],
    text: "Highest Level of Education Completed:",
  },
  {
    type: "text-radio",
    choices: [
      "No",
      "Yes, one dependent",
      "Yes, two dependents",
      "Yes, three or more dependents",
      "Prefer not to answer",
    ],
    text: "Do you have any dependents",
  },
  {
    type: "text-radio-multiple",
    choices: [
      "Australia",
      "Non-Australia",
      "Select Continent",
      "Africa",
      "Antarctica",
      "Asia",
      "Europe",
      "North America",
      "South America",
    ],
    text: "Country of Birth (Choose one or more that apply):",
  },
  {
    type: "text-radio",
    choices: [
      "Renter",
      "Outright Homeowner",
      "Homeowner with a mortgage",
      "Living with family",
      "In the process of buying a home or in temporary accommodation",
    ],
    description: ["Other (specify)"],
    text: "What is your current housing status?",
  },
  {
    type: "text-radio",
    choices: [
      "First home purchase",
      "Investment property",
      "Upgrade from current home",
      "Downsize from current home",
      "Purchase a holiday home",
      "Purchase for development (knockdown and rebuild)",
      "Purchase for commercial activities",
      "Other",
    ],
    text: "If you were to purchase your next property, what would be the reason?",
  },
  {
    type: "text-radio",
    choices: [
      "Within 6 months",
      "12 months",
      "3 years",
      "5 years",
      "Undecided/unsure",
    ],
    text: "When do you think you will purchase your next property?",
  },
  {
    type: "text-radio",
    choices: [
      "Rent only",
      "Own one property (primary residence)",
      "Own multiple property (Including Primary Residence)",
      "Own property, but rent primary residence",
      "Own one property for residence and one for a holiday home",
    ],
    text: "How many properties do you currently own?",
  },
  {
    type: "text-radio",
    choices: [
      "Less than 1 year",
      "1 - 5 years",
      "5 - 10 years",
      "10 - 20 years",
      "20 - 30 years",
      "30+ years",
    ],
    text: "When did you buy your first property?",
  },
  {
    type: "image",
    images: ["Images/Question1/1.jpg"],
    rating: [
      "How appealing is the exterior and front yard of this home?",
      "Rate how family-friendly this home appears, considering space, layout",
      "How likely are you to buy a home in this style?",
    ],
    text: "How much do you think the home is worth?",
    radiotext: {
      choices: [
        "Less than 200k",
        "200 - 300k",
        "300 - 500k",
        "500 - 800k",
        "800 - 1 million",
        "1 million +",
      ],
    },
  },
  {
    type: "image",
    images: ["Images/Question1/1.jpg"],
    rating: [
      "How appealing is the exterior and front yard of this home?",
      "Rate how family-friendly this home appears, considering space, layout",
      "How likely are you to buy a home in this style?",
    ],
    text: "How much do you think the home is worth?",
    radiotext: {
      choices: [
        "Less than 200k",
        "200 - 300k",
        "300 - 500k",
        "500 - 800k",
        "800 - 1 million",
        "1 million +",
      ],
    },
  },
  {
    type: "image",
    images: ["Images/Question1/1.jpg"],
    rating: [
      "How effectively do you think the space has been utilized in this apartment?",
      "Rate the amount of natural light you perceive in this apartment from the images.",
      "How appealing is the view from this apartment, based on the images?",
      "How likely are you to buy an apartment in this style?",
    ],
    text: "How much do you think the home is worth?",
    radiotext: {
      choices: [
        "Less than 200k",
        "200 - 300k",
        "300 - 500k",
        "500 - 800k",
        "800 - 1 million",
        "1 million +",
      ],
    },
  },
  {
    type: "image",
    images: ["Images/Question1/1.jpg"],
    rating: [
      "How effectively do you think the space has been utilized in this apartment?",
      "Rate the amount of natural light you perceive in this apartment from the images.",
      "How appealing is the view from this apartment, based on the images?",
      "How likely are you to buy a home in this style?",
    ],
    text: "How much do you think the home is worth?",
    radiotext: {
      choices: [
        "Less than 200k",
        "200 - 300k",
        "300 - 500k",
        "500 - 800k",
        "800 - 1 million",
        "1 million +",
      ],
    },
  },
  {
    type: "image",
    images: ["Images/Question1/1.jpg"],
    rating: [
      "How appealing is the exterior and front yard of this home?",
      "Rate how family-friendly this home appears, considering space, layout",
      "How likely are you to buy a home in this style?",
    ],
    text: "How much do you think the home is worth?",
    radiotext: {
      choices: [
        "Less than 200k",
        "200 - 300k",
        "300 - 500k",
        "500 - 800k",
        "800 - 1 million",
        "1 million +",
      ],
    },
  },
  {
    type: "image",
    images: ["Images/Question1/1.jpg"],
    rating: [
      "How appealing is the exterior and front yard of this home?",
      "Rate how family-friendly this home appears, considering space, layout",
      "How likely are you to buy a home in this style?",
    ],
    text: "How much do you think the home is worth?",
    radiotext: {
      choices: [
        "Less than 200k",
        "200 - 300k",
        "300 - 500k",
        "500 - 800k",
        "800 - 1 million",
        "1 million +",
      ],
    },
  },
  {
    type: "image",
    images: ["Images/Question1/1.jpg"],
    rating: [
      "How appealing is the exterior and front yard of this home?",
      "Rate how family-friendly this home appears, considering space, layout",
      "How likely are you to buy a home in this style?",
    ],
    text: "How much do you think the home is worth?",
    radiotext: {
      choices: [
        "Less than 200k",
        "200 - 300k",
        "300 - 500k",
        "500 - 800k",
        "800 - 1 million",
        "1 million +",
      ],
    },
  },
  {
    type: "image",
    images: [
      "Images/Question1/1.jpg",
      "Images/Question1/2.jpg",
      "Images/Question1/5.jpg",
      "Images/Question1/1.jpg",
      "Images/Question1/2.jpg",
      "Images/Question1/5.jpg",
    ],
    text: "How do you like the living room of this home?",
  },
  {
    type: "image",
    images: [
      "Images/Question1/1.jpg",
      "Images/Question1/2.jpg",
      "Images/Question1/5.jpg",
      "Images/Question1/1.jpg",
      "Images/Question1/2.jpg",
      "Images/Question1/5.jpg",
    ],
    text: "How do you like the living room of this home?",
  },
  {
    type: "text",
    text: "Please describe your ideal living room.",
  },
  {
    type: "image",
    images: [
      "Images/Question1/1.jpg",
      "Images/Question1/2.jpg",
      "Images/Question1/5.jpg",
    ],
    text: "Does this home suit your needs?",
  },
];
