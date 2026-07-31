import albanyPark from '../assets/images/hoods/albany-park.jpg'
import andersonville from '../assets/images/hoods/andersonville.jpg'
import avondale from '../assets/images/hoods/avondale.jpg'
import beverly from '../assets/images/hoods/beverly.jpg'
import bronzeville from '../assets/images/hoods/bronzeville.jpg'
import bucktown from '../assets/images/hoods/bucktown.jpg'
import chinatown from '../assets/images/hoods/chinatown.jpg'
import edgewater from '../assets/images/hoods/edgewater.jpg'
import goldCoast from '../assets/images/hoods/gold-coast.jpg'
import irvingPark from '../assets/images/hoods/irving-park.jpg'
import lakeView from '../assets/images/hoods/lake-view.jpg'
import lincolnSquare from '../assets/images/hoods/lincoln-square.jpg'
import pilsen from '../assets/images/hoods/pilsen.jpg'
import riverNorth from '../assets/images/hoods/river-north.jpg'
import rogersPark from '../assets/images/hoods/rogers-park.jpg'
import southLoop from '../assets/images/hoods/south-loop.jpg'
import streeterville from '../assets/images/hoods/streeterville.jpg'
import uptown from '../assets/images/hoods/uptown.jpg'
import westLoop from '../assets/images/hoods/west-loop.jpg'
import wrigleyville from '../assets/images/hoods/wrigleyville.jpg'

/**
 * A distinct card image per Chicago neighbourhood.
 *
 * Every card now uses a real photograph of the named place, pulled from
 * Wikimedia Commons and square-cropped by the card. Do not substitute generic
 * cleaning interiors here: this list is how visitors visually verify that a
 * search result points to the neighborhood they asked for.
 *
 * Anything in CREDITS below must stay credited; see the Image credits block at
 * the foot of the locations page. Swap a fallback for a real photo any time —
 * add the file, point the entry at it, and add a CREDITS row if it needs one.
 */
export const HOOD_IMAGES = {
  'Albany Park': albanyPark,
  Andersonville: andersonville,
  Avondale: avondale,
  Beverly: beverly,
  Bronzeville: bronzeville,
  Bucktown: bucktown,
  Chinatown: chinatown,
  Edgewater: edgewater,
  'Gold Coast': goldCoast,
  'Irving Park': irvingPark,
  'Lake View': lakeView,
  'Lincoln Square': lincolnSquare,
  Pilsen: pilsen,
  'River North': riverNorth,
  'Rogers Park': rogersPark,
  'South Loop': southLoop,
  Streeterville: streeterville,
  Uptown: uptown,
  'West Loop': westLoop,
  Wrigleyville: wrigleyville,
}

/** Attribution for the Commons photographs. Public-domain entries are listed
 *  too — no obligation, but it keeps the provenance in one place. */
export const HOOD_CREDITS = [
  { hood: 'Downtown / Loop', title: 'Chicago Loop Skyline at Sunset', author: 'GazeboJake', licence: 'CC0', href: 'https://commons.wikimedia.org/wiki/File:Chicago_Loop_Skyline_at_Sunset.jpg' },
  { hood: 'Albany Park', title: 'Mayfair Branch Library, Chicago, IL', author: 'Nick Number', licence: 'CC BY 4.0', href: 'https://commons.wikimedia.org/wiki/File:Mayfair_Branch_Library%2C_Chicago%2C_IL.jpg' },
  { hood: 'Andersonville', title: 'Andersonville, Chicago', author: 'Zagalejo', licence: 'Public domain', href: 'https://commons.wikimedia.org/wiki/File:Andersonville,_Chicago.JPG' },
  { hood: 'Avondale', title: 'Jackowo Chicago', author: 'WlaKom', licence: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Jackowo_Chicago.jpg' },
  { hood: 'Beverly', title: 'Givens Irish Castle', author: 'Peter Fitzgerald', licence: 'Public domain', href: 'https://commons.wikimedia.org/wiki/File:Givens_Irish_Castle.jpg' },
  { hood: 'Bronzeville', title: "35-Bronzeville-IIT 'L' Station 2023a", author: 'Antony-22', licence: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:35-Bronzeville-IIT_%27L%27_Station_2023a.jpg' },
  { hood: 'Bucktown', title: 'Bucktown', author: 'Payton Chung', licence: 'CC BY 2.0', href: 'https://commons.wikimedia.org/wiki/File:Bucktown_%283638907948%29.jpg' },
  { hood: 'Chinatown', title: '22nd Place, Chinatown, Chicago, IL', author: 'Warren LeMay', licence: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:22nd_Place%2C_Chinatown%2C_Chicago%2C_IL_%2854839599794%29.jpg' },
  { hood: 'Edgewater', title: '5848 N Broadway Pediment', author: 'Paul R. Burley', licence: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:5848_N_Broadway_Pediment_Chicago_2019-0196.jpg' },
  { hood: 'Gold Coast', title: 'Chicago Architecture — Gold Coast Neighborhood', author: 'Adam Jones, Ph.D.', licence: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Chicago_Architecture_-_Gold_Coast_Neighborhood_-_Chicago_-_Illinois_-_USA_-_01.jpg' },
  { hood: 'Irving Park', title: '20 gables, part 2', author: 'Payton Chung', licence: 'CC BY 2.0', href: 'https://commons.wikimedia.org/wiki/File:20_gables%2C_part_2_%283456429589%29.jpg' },
  { hood: 'Lake View', title: 'Lakeview, Chicago, Illinois', author: 'Ken Lund', licence: 'CC BY-SA 2.0', href: 'https://commons.wikimedia.org/wiki/File:Lakeview,_Chicago,_Illinois_(28522637047).jpg' },
  { hood: 'Lincoln Square', title: 'Conrad Sulzer Regional Library', author: 'Amerique', licence: 'CC BY 3.0', href: 'https://commons.wikimedia.org/wiki/File:Conrad_Sulzer_Regional_Library.jpg' },
  { hood: 'Pilsen', title: '“Casa de la Cultura” in Pilsen', author: 'David Hilowitz', licence: 'CC BY 2.0', href: 'https://commons.wikimedia.org/wiki/File:%22Casa_de_la_Cultura%22_in_Pilsen_%284560585664%29.jpg' },
  { hood: 'River North', title: 'Marina City, Chicago', author: 'Diego Delso', licence: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Marina_City,_Chicago,_Illinois,_Estados_Unidos,_2012-10-20,_DD_01.jpg' },
  { hood: 'Rogers Park', title: 'Aerial view of the L in Rogers Park', author: 'Pi.1415926535', licence: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_L_in_Rogers_Park%2C_September_2019.JPG' },
  { hood: 'South Loop', title: 'Chicago, Illinois, USA', author: "Pom'", licence: 'CC BY-SA 2.0', href: 'https://commons.wikimedia.org/wiki/File:%281%29_Chicago%2C_Illinois%2C_USA.jpg' },
  { hood: 'Streeterville', title: 'Navy Pier & Skyline, Chicago', author: 'IIP Photo Archive', licence: 'CC BY 2.0', href: 'https://commons.wikimedia.org/wiki/File:Navy_Pier_%26_Skyline,_Chicago,_Illinois,_U.S.A.jpg' },
  { hood: 'Uptown', title: 'Uptown Theatre Chicago 2020-3212', author: 'Paul R. Burley', licence: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Uptown_Theatre_Chicago_2020-3212.jpg' },
  { hood: 'West Loop', title: 'West Loop Chicago', author: 'Kidfly182', licence: 'CC BY 4.0', href: 'https://commons.wikimedia.org/wiki/File:West_Loop_Chicago.jpg' },
  { hood: 'Wrigleyville', title: 'Cubs mural by Tony Passero, outside Wrigleyville Sports', author: 'Arturo Pardavila III', licence: 'CC BY 2.0', href: 'https://commons.wikimedia.org/wiki/File:A_Cubs_mural_-_by_artist_Tony_Passero_-_outside_Wrigleyville_Sports%2C_across_from_Wrigley_Field._%2830406885831%29.jpg' },
]
