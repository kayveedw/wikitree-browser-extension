import { shouldInitializeFeature, getFeatureOptions } from "../../core/options/options_storage";

shouldInitializeFeature("migrationCategoryHelper").then((result) => {
  if (result) {
    let wpTextbox1 = window.document.getElementById("wpTextbox1");
    if (wpTextbox1 != null && wpTextbox1.value == "") {
      CreateMigrationCategory(wpTextbox1);
    }
  }
});

function CreateMigrationCategory(tb) {
  const title = window.document.title;
  const indexCategory = title.indexOf("Category:") + "Category:".length;
  const cat = title.substring(indexCategory);

  let countryFrom = "";
  let entityFrom = "";
  let countryTo = "";
  let entityTo = "";

  if (cat.indexOf("Migrants") > -1) {
    const indexTo = cat.indexOf(" to ");
    const fromPart = cat.substring(0, indexTo);
    const toPart = cat.substring(indexTo);
    countryTo = getRightFromWord("to ", toPart);
    entityTo = getRightFromWord("to ", toPart);
    countryFrom = getRightFromWord("from ", fromPart);
    entityFrom = getRightFromWord("from ", fromPart);
  } else if (cat.indexOf("Emigrants") > -1) {
    countryFrom = getLeftFromComma(cat);
    entityFrom = getLeftFromComma(cat);

    if (cat.indexOf(" to ") > -1) {
      countryTo = getRightFromWord("to ", cat);
      entityTo = getRightFromWord("to ", cat);
    }
  } else if (cat.indexOf("Immigrants") > -1) {
    countryTo = getLeftFromComma(cat);
    entityTo = getLeftFromComma(cat);
    if (cat.indexOf(" from ") > -1) {
      countryFrom = getRightFromWord("from ", cat);
      entityFrom = getRightFromWord("from ", cat);
    }
  } else {
    //no migration category
    return;
  }

  const entities = {
    "Holy Roman Empire": [],

    Australia: ["Western Australia", "South Australia", "Queensland", "New South Wales", "Victoria", "Tasmania"],

    "Austria-Hungary": ["Kingdom of Bohemia", "Kingdom of Galicia and Lodomeria", "Kingdom of Hungary"],

    England: [
      "Bedfordshire",
      "Berkshire",
      "Buckinghamshire",
      "Cambridgeshire",
      "Cheshire",
      "Cornwall",
      "Cumberland",
      "Derbyshire",
      "Devon",
      "Dorset",
      "County Durham",
      "Essex",
      "Gloucestershire",
      "Hampshire",
      "Herefordshire",
      "Hertfordshire",
      "Huntingdonshire",
      "Kent",
      "Lancashire",
      "Leicestershire",
      "Lincolnshire",
      "Middlesex",
      "Norfolk",
      "Northamptonshire",
      "Northumberland",
      "Nottinghamshire",
      "Oxfordshire",
      "Rutland",
      "Shropshire",
      "Somerset",
      "Staffordshire",
      "Suffolk",
      "Surrey",
      "Sussex",
      "Warwickshire",
      "Westmorland",
      "Wiltshire",
      "Worcestershire",
      "Yorkshire",
    ],

    Canada: [
      "Ontario",
      "Quebec",
      "Nova Scotia",
      "New Brunswick",
      "Manitoba",
      "British Columbia",
      "Prince Edward Island",
      "Saskatchewan",
      "Alberta",
      "Newfoundland and Labrador",
    ],

    "German Confederation": [
      "Austrian Empire",
      "Archduchy of Austria",
      "Upper Austria",
      "Lower Austria",
      "Kingdom of Bohemia",
      "Margraviate of Moravia",
      "Grand Duchy of Salzburg",
      "Duchy of Carinthia",
      "Duchy of Carniola",
      "Duchy of Upper and Lower Silesia",
      "Duchy of Styria",
      "Littoral",
      "County of Tyrol",
      "Vorarlberg",
      "Kingdom of Hanover",
      "Electorate of Hesse",
      "Grand Duchy of Luxemburg",
      "Duchy of Holstein",
      "Duchy of Limburg",
      "Duchy of Nassau",
      "Duchy of Saxe-Coburg-Saalfeld",
      "Duchy of Saxe-Gotha-Altenburg",
      "Duchy of Saxe-Hildburghausen",
      "Duchy of Anhalt-Bernburg",
      "Duchy of Anhalt-Dessau",
      "Duchy of Anhalt-Dessau-Köthen",
      "Duchy of Anhalt-Köthen",
      "Principality of Hohenzollern-Hechingen",
      "Principality of Hohenzollern-Sigmaringen",
      "Principality of Liechtenstein",
      "Principality of Lippe",
      "Landgraviate of Hesse-Homburg",
      "Free City of Frankfurt upon Main",
    ],

    "German Empire": [
      /* tbd: Alsace Lorraine*/ "Grand Duchy of Saxony",
      "Duchy of Anhalt",
      "Principality of Lippe-Detmold",
    ],
    "German Confederation/Empire (delete one)": [
      "Prussia",
      "Kingdom of Bavaria",
      "Kingdom of Saxony",
      "Kingdom of Württemberg",
      "Grand Duchy of Baden",
      "Grand Duchy of Hesse",
      "Grand Duchy of Mecklenburg-Schwerin",
      "Grand Duchy of Mecklenburg-Strelitz",
      "Grand Duchy of Oldenburg",
      "Grand Duchy of Saxe-Weimar-Eisenach",
      "Duchy of Brunswick",
      "Duchy of Saxe-Coburg and Gotha",
      "Duchy of Saxe-Altenburg",
      "Duchy of Saxe-Lauenburg",
      "Duchy of Saxe-Meiningen",
      "Duchy of Anhalt",
      "Principality of Reuss Junior Line",
      "Principality of Reuss Senior Line",
      "Principality of Schaumburg-Lippe",
      "Principality of Schwarzburg-Rudolstadt",
      "Principality of Schwarzburg-Sondershausen",
      "Principality of Waldeck and Pyrmont",
      "Free Hanseatic City of Bremen",
      "Free and Hanseatic City of Hamburg",
      "Free and Hanseatic City of Lübeck",
    ],

    Germany: [
      "Baden-Württemberg",
      "Bavaria",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hesse",
      "Mecklenburg-Vorpommern",
      "Lower Saxony",
      "North Rhine-Westphalia",
      "Rhineland-Palatinate",
      "Saarland",
      "Saxony",
      "Saxony-Anhalt",
      "Schleswig-Holstein",
      "Thuringia",
    ],

    Ireland: [
      "County Dublin",
      "County Wicklow",
      "County Wexford",
      "County Carlow",
      "County Kildare",
      "County Meath",
      "County Louth",
      "County Monaghan",
      "County Cavan",
      "County Longford",
      "County Westmeath",
      "County Offaly",
      "King’s County  ",
      "County Laois",
      "Queen’s County ",
      "County Leix",
      "County Kilkenny",
      "County Waterford",
      "County Cork",
      "County Kerry",
      "County Limerick",
      "County Tipperary",
      "County Clare",
      "County Galway",
      "County Mayo",
      "County Roscommon",
      "County Sligo",
      "County Leitrim",
      "County Donegal",
      "County Fermanagh",
      "County Tyrone",
      "County Derry",
      "County Antrim",
      "County Down",
      "County Armagh",
    ],

    "the Netherlands": [
      "Drenthe",
      "Flevoland",
      "Friesland",
      "Gelderland",
      "Groningen",
      "Limburg",
      "North Brabant",
      "North Holland",
      "Overijssel",
      "South Holland",
      "Utrecht",
      "Zeeland",
    ],

    "United States": [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "Kalifornien",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
  };

  countryTo = GetKnownCountry(entityTo, entities);
  entityTo = GetBlankEntityIfIsCountry(entityTo, entities);

  countryFrom = GetKnownCountry(entityFrom, entities);
  entityFrom = GetBlankEntityIfIsCountry(entityFrom, entities);
  let value =
    "{{CategoryInfoBox Migration\n" +
    "|fromCountry=" +
    countryFrom +
    "\n" +
    "|fromEntity=" +
    entityFrom +
    "\n" +
    "|image=\n" +
    "|location=\n" +
    "|toCountry=" +
    countryTo +
    "\n" +
    "|toEntity=" +
    entityTo +
    "\n" +
    "}}";
  tb.value = value;
}

function getLeftFromComma(cat) {
  const indexComma = cat.indexOf(",");
  return cat.substring(0, indexComma).trim();
}

function getRightFromWord(word, cat) {
  const indexWord = cat.indexOf(word) + word.length;
  return cat.substring(indexWord).trim();
}

function GetBlankEntityIfIsCountry(entity, entities) {
  Object.entries(entities).forEach(([country, states]) => {
    if (country == entity) {
      entity = "";
    }
  });
  return entity;
}

function GetKnownCountry(entity, entities) {
  Object.entries(entities).forEach(([country, states]) => {
    if (states.includes(entity)) {
      entity = country;
    }
  });
  return entity;
}