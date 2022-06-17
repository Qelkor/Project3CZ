// Just the user form
const chrisForm = {
  propertyType: "HDB",
  propertyStatus: "New",
  renoType: "Full",
  renoPriority: "Stick to budget",
  keyCollected: date,
  loanRequired: false,
  rooms: ["bedrooms", "kitchen", "toilet", "livingroom"],
  budget: 90000,
  floorSize: 690,
  comments: " TBA ",
  selection: [
    {
      roomName: "bedrooms",
      roomOptions: { package: "Package 1", theme: ["modern", "industrial"] },
    } /*...*/,
  ],
  vendor: "PCK PTE LTD",
};

// second form
const chrisForm2 = {
  propertyType: "HDB",
  propertyStatus: "New",
  renoType: "Full",
  renoPriority: "Stick to budget",
  keyCollected: false,
  loanRequired: false,
  rooms: ["bedrooms", "kitchen", "toilet", "livingroom"],
  budget: 90000,
  floorSize: 690,
  comments: " TBA ",
  selection: [
    {
      roomName: "bedrooms",
      roomOptions: { package: "Package 1", theme: ["modern", "industrial"] },
    } /*...*/,
  ],
  vendor: "CZ PTE LTD",
};

//user complete form
const ChrisUser = {
  name: "Chris",
  email: "telkor2@gmail.com",
  password: "1234",
  userForm: [
    {
      propertyType: "HDB",
      propertyStatus: "New",
      renoType: "Full",
      renoPriority: "Stick to budget",
      keyCollected: false,
      loanRequired: false,
      rooms: ["bedrooms", "kitchen", "toilet", "livingroom"],
      budget: 90000,
      floorSize: 690,
      comments: " TBA ",
      selection: [
        {
          roomName: "bedrooms",
          roomOptions: {
            package: "Package 1",
            theme: ["modern", "industrial"],
          },
        } /*...*/,
      ],
      vendor: "Phua Chu Kang",
    },
    {
      propertyType: "HDB",
      propertyStatus: "New",
      renoType: "Full",
      renoPriority: "Stick to budget",
      keyCollected: false,
      loanRequired: false,
      rooms: ["bedrooms", "kitchen", "toilet", "livingroom"],
      budget: 90000,
      floorSize: 690,
      comments: " TBA ",
      selection: [
        {
          roomName: "bedrooms",
          roomOptions: {
            package: "Package 1",
            theme: ["modern", "industrial"],
          },
        } /*...*/,
      ],
      vendor: "CZ PTE LTD",
    },
  ],
};

// ID DB
const PhuaChuKang = {
  name: "PCK PTE LTD",
  theme: [
    { name: "modern", source: "url//http:2022" },
    { name: "industrial", source: "url//http:3022" },
  ],
  description: "Best in singapore, JB and some say Batam.",
  certs: ["caseTrust", "Certified pandomo contractor", "Italian marble"],
  rooms: [
    {
      name: "kitchen",
      Packages: [
        {
          name: "package 1",
          info: ["Cabinets and flooring", "10000", "stainless steel"],
        },
        {
          name: "package 2",
          info: ["package 1 + elbow chimney", "20,000", "quartz"],
        },
      ],
    },
  ],
};

//Room model
const Kitchen = {
  name: "kitchen",
  Packages: [
    {
      name: "package 1",
      info: ["Cabinets and flooring", "10000", "stainless steel"],
    },
    {
      name: "package 2",
      info: ["package 1 + elbow chimney", "20,000", "quartz"],
    },
  ],
};

const toilet = {
  name: "toilet",
  Packages: [
    {
      name: "package 1",
      info: ["Cabinets and flooring", "5000", "stainless steel"],
    },
    {
      name: "package 2",
      info: ["package 1 + golden toilet bowl", "10,000", "quartz"],
    },
  ],
};
