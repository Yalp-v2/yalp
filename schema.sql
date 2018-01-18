DROP DATABASE IF EXISTS yalp;

CREATE DATABASE yalp;

USE yalp;


CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` MEDIUMTEXT NOT NULL,
  `password` MEDIUMTEXT NOT NULL,
  `username` MEDIUMTEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` VARCHAR(50),
  PRIMARY KEY (`id`)
);

CREATE TABLE `reviews` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL DEFAULT 0,
  `business_id` VARCHAR(255) NOT NULL DEFAULT 0,
  `text` MEDIUMTEXT NOT NULL,
  `rating` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `businesses` (
  `id` VARCHAR(255) NOT NULL,
  `name` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `checkins` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `business_id` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `bookmarks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `business_id` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `friends` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id1` integer NOT NULL,
  `user_id2` integer NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `favorites` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `business_id` VARCHAR(255) NOT NULL,
  `business_name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `searches`;

CREATE TABLE `searches` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_searches` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL, 
  `searchString` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
); 

CREATE TABLE `user_categories` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL, 
  `category` VARCHAR(50) NOT NULL, 
  `weight` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO businesses (name, id) VALUE ("Tu Lan", "1a");
INSERT INTO businesses (name, id) VALUE ("Chipotle", "1b");
INSERT INTO businesses (name, id) VALUE ("McDonalds", "1c");
INSERT INTO businesses (name, id) VALUE ("Fancy Steak House", "1d");
INSERT INTO businesses (name, id) VALUE ("Tempest", "1e");
INSERT INTO businesses (name, id) VALUE ("Some Expensive Place", "1f");


INSERT INTO users (name, email, password, username) VALUES ("Chris", "Chris@Chris.com", "Chris", "ChrisChris");
INSERT INTO users (name, email, password, username) VALUES ("Kayleigh", "Kayleigh@Kayleigh.com", "Kayleigh", "Kayleigh");
INSERT INTO users (name, email, password, username) VALUES ("Connor", "Connor@Connor.com", "Connor", "Connor");
INSERT INTO users (name, email, password, username) VALUES ("Peter", "Peter@Peter.com", "Peter", "PeterPeterPumpkinEater");
INSERT INTO users (name, email, password, username) VALUES ("Fred", "Fred@Fred.com", "Fred", "Fred");
INSERT INTO users (name, email, password, username) VALUES ("Moises", "Moises@Chris.com", "BigCuddlyBear", "Weird");


INSERT INTO reviews (user_id, business_id, text, rating) VALUES (1, '1a', "this place is really tasty", 1);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (2, '1b', "this place sucks ass", 2);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (3, '1c', "this place could use better service", 2);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (4, '1d', "this place is pretty mediocre", 3);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (5, '1e', "this place is pretty good", 4);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (6, '1f', "this place is utter trash", 2);


INSERT INTO checkins (user_id, business_id) VALUES (1, '1a');
INSERT INTO checkins (user_id, business_id) VALUES (1, '1b');
INSERT INTO checkins (user_id, business_id) VALUES (1, '1c');
INSERT INTO checkins (user_id, business_id) VALUES (2, '1d');
INSERT INTO checkins (user_id, business_id) VALUES (1, '1e');
INSERT INTO checkins (user_id, business_id) VALUES (1, '1f');
INSERT INTO checkins (user_id, business_id) VALUES (3, '1a');
INSERT INTO checkins (user_id, business_id) VALUES (3, '1b');
INSERT INTO checkins (user_id, business_id) VALUES (3, '1c');
INSERT INTO checkins (user_id, business_id) VALUES (4, '1d');
INSERT INTO checkins (user_id, business_id) VALUES (4, '1e');
INSERT INTO checkins (user_id, business_id) VALUES (4, '1f');
INSERT INTO checkins (user_id, business_id) VALUES (5, '1a');
INSERT INTO checkins (user_id, business_id) VALUES (5, '1b');
INSERT INTO checkins (user_id, business_id) VALUES (5, '1c');
INSERT INTO checkins (user_id, business_id) VALUES (6, '1d');
INSERT INTO checkins (user_id, business_id) VALUES (6, '1e');
INSERT INTO checkins (user_id, business_id) VALUES (6, '1f');


INSERT INTO favorites (user_id, business_id, business_name) VALUES (1, '1a', 'Tu Lan');
INSERT INTO favorites (user_id, business_id, business_name) VALUES (1, '1b', 'Chipotle');
INSERT INTO favorites (user_id, business_id, business_name) VALUES (1, '1c', 'McDonalds');
INSERT INTO favorites (user_id, business_id, business_name) VALUES (2, '1d', 'Fancy Steak House');
INSERT INTO favorites (user_id, business_id, business_name) VALUES (1, '1e', 'Tempest');
INSERT INTO favorites (user_id, business_id, business_name) VALUES (1, '1f', 'Some Expensive Place');




INSERT INTO friends (user_id1, user_id2) VALUES (1, 2);
INSERT INTO friends (user_id1, user_id2) VALUES (1, 3);
INSERT INTO friends (user_id1, user_id2) VALUES (1, 4);
INSERT INTO friends (user_id1, user_id2) VALUES (1, 6);
INSERT INTO friends (user_id1, user_id2) VALUES (2, 3);
INSERT INTO friends (user_id1, user_id2) VALUES (2, 5);
INSERT INTO friends (user_id1, user_id2) VALUES (2, 6);
INSERT INTO friends (user_id1, user_id2) VALUES (3, 4);
INSERT INTO friends (user_id1, user_id2) VALUES (3, 5);
INSERT INTO friends (user_id1, user_id2) VALUES (3, 6);
INSERT INTO friends (user_id1, user_id2) VALUES (4, 6);
INSERT INTO friends (user_id1, user_id2) VALUES (5, 6);

DROP TABLE IF EXISTS `deals`;
		
CREATE TABLE `deals` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `deal_title` VARCHAR(255) NULL DEFAULT NULL,
  `merchant_name` VARCHAR(100) NOT NULL,
  `merchant_lat` VARCHAR(30) NOT NULL,
  `merchant_lng` VARCHAR(30) NOT NULL,
  `starts` VARCHAR(30) NOT NULL,
  `ends` VARCHAR(30) NOT NULL,
  `highlights` VARCHAR(255) NULL DEFAULT NULL,
  `pitch` VARCHAR(255) NULL DEFAULT NULL,
  `fine_print` VARCHAR(255) NULL DEFAULT NULL,
  `img_url` VARCHAR(255) NULL DEFAULT NULL,
  `deal_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `deals` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES ('','','','','','','','','','','');

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES
('Brewery Package for Two or Four at Federation Brewing (Up to 52% Off)','Federation Brewing','37.7967073','-122.27511', '2018-01-14T08:00:00Z','2018-01-18T07:59:59Z', '<p>Guests can taste beers such as Low Boy, Hot Nonsense, After Hours Chocolate Stout, Dry Hopped Porter and more.</p>','<p>Choice of:</p>
<ul>
  <li>Brewery Package for Two</li>
  <li>Brewery Package for Four</li>
</ul>
<p>Includes:</p>
<ul>
  <li>One tasting flight per person</li>
  <li>One pint per person</li>
  <li>One souvenir glass per person</li>
</ul>','May be repurchased every 120 days. Limit 1 per person, may buy 1 additional as gift. Valid only for option purchased. Must be 21+ with a valid ID.','https://img.grouponcdn.com/deal/44kbRAjgZPRnyiCiLX1SUw2z64bY/44-1436x862/v1/t300x182.jpg','http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Ffederation-brewing-1%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN');

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES
('Enter to Win Meals for a Year at Groupon+ Restaurants – 50 Winners','Free Entry - 50 Winners','38.5149876','-89.98476670000001', '2018-01-16T05:00:00Z','2018-02-12T07:59:59Z', '<p>Enter to win a year&#8217;s worth of dine-in, carryout, or delivery meals at any Groupon+ restaurant</p>','null','<ul>
<li>Claim this $0 deal and enroll an eligible Visa or Mastercard card in Groupon+ at checkout to receive an entry.</li>
<li>Limit one entry per person.</li>
<li>Cash back for winners is capped at $150 per transaction.</li>
</ul>
','https://img.grouponcdn.com/deal/2VMggAed8erqRmYxxYbBbfHssLyi/2V-700x420/v1/t300x182.jpg','http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fgrouponplus-meals-for-a-year%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN');

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES
('Original Glazed Doughnuts and Drinks at Krispy Kreme - Bay Area (Up to 58% Off). Two Options Available. ','Krispy Kreme','37.4192436','-122.0942945', '2016-11-29T08:00:00Z','2041-04-04T06:59:59Z', '<p>Original Glazed doughnuts from iconic doughnut shop </p>','null','Limit 1 per person, may buy 1 additional as gift. Limit 1 per visit. Valid only for option purchased. Valid at listed locations only. Thepunchcard for 5 drinks expires on 2/28/2018.','https://img.grouponcdn.com/deal/iCGAudCrLWw7XGRPBXhLbU/IMAGE_Krispy-Kreme1-700x420/v1/t300x182.jpg','http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fkrispy-kreme-doughnuts-san-francisco-10%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN');

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES('Sake Tasting for Two with Two or Three Take-Home Bottles at Takara Sake USA (Up to 47%Off)','Takara Sake USA','37.8660664','-122.3000274', '2017-11-11T08:00:00Z','2042-03-13T07:00:00Z', '<p>Guests sample sake in a Japanese-style tasting room, as well as receive two or three bottles of the beverage</p>','null','May be repurchased every 120 days.Online reservation required. Limit 2 per person, may buy 2 additional as gifts. Limit 1 per visit. Limit 1 per table. Valid only for option purchased. Must be 21 or older.','https://img.grouponcdn.com/iam/3H5cfq4aqRHzVgrSRy8SvpX1guAb/3H-2048x1229/v1/t300x182.jpg','http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Ftakara-sake-usa-inc%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN');

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("50% Cash Back at Castagnola\'s - Up to $10 in Cash Back","Castagnola\'s",'37.8081022','-122.4175276', '2018-01-17T08:00:00Z','2042-05-19T07:00:00Z', '<p>Located at Fisherman&#8217;s Wharf, this waterfront restaurantservesup seafood, steaks, and wines with views of the harbor and downtown skyline</p>','null','null','https://img.grouponcdn.com/deal/gkB3F2JZbH3e4PeuFPcawV/178604184badged-1500x900/v1/t300x182.jpg','http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fcastagnolas%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN');

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Crab Dinner at Capurro's (Up to 54% Off)","Capurro's","37.8076089","-122.4207644","2016-11-15T08:00:00Z","2018-02-28T07:59:59Z","<p>Family-owned restaurant has been in business for over 70 years and has heritage in fishing industry dating to 1898</p>","null","Limit 10 per person. Dine-in only. Valid only for option purchased. Not valid for happy hour or other specials. Not valid on New Year's Eve, New Years Day, or Valentine's Day. <b>Phone reservation required; online and emailreservations not accepted.</b>","https://img.grouponcdn.com/deal/m8Ff4kyRChXWGq3hzuss/U1-700x420.jpg/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fcapurros-dungeness-crabs%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");
INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("15 Bottles of Premium Wine and $50 Gift Voucher from Heartwood & Oak (Up to $310.85 Value)  ","Heartwood & Oak","32.4487","-99.7331","2016-12-01T05:00:00Z","2041-04-06T06:59:59Z","<p>This 15-bottle bundle feature premium California wines that boast a plethora of awards and accolades</p>","null","null","https://img.grouponcdn.com/deal/2r6T65uAKWv9AKnS15i74b43e2Hk/2r-1400x840/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fheartwood-oak-18-77-national%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("French Bistro Dinner or Lunch for Two or Four at Chouchou (Up to 37% Off)","Chouchou","37.7475019","-122.4594566","2014-10-22T07:00:00Z","2039-02-25T07:59:59Z","<p>Traditional Provençal cuisine such as confit duck, seared filet mignon, and mushroom soufflé, ending with sweets such as banana flambé</p>","null","null","https://img.grouponcdn.com/deal/3Fy1WdfrUauzBr3PdDTqsvx8zq6L/3F-730x438/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fchouchou-1%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Up to 42% Off at the Sierra Nevada Torpedo Room","Sierra Nevada Torpedo Room","37.8665627","-122.2994092","2016-11-05T07:00:00Z","2041-03-11T06:59:59Z","<p>The Torpedo Room in Berkeley is Sierra Nevada&#8217;s first tasting room. An intimate space that weaves craft beer science with flavor and culture</p>","<h4>Choose Between Two Options</h4>

<ul>
  <li>$15.50 for $25 for two or more guests</li>
  <li>$29 for $50 for four or more guests</li>
</ul>","null","https://img.grouponcdn.com/deal/4CBe6JU42fj4hdSrcAbzLhhudVaV/4C-960x576/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fsierra-nevada-torpedo-room%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("30-Year Anniversary Celebration: Prix Fixe Dinner at Izzy's Steaks and Chops - San Fran (Up to 31% Off)","Izzy's Steaks and Chops - San Fran","37.8003043","-122.4379531","2017-03-29T07:00:00Z","2041-08-02T06:59:59Z","<p>Prix fixe steakhouse dinner with salad or soup, fresh fish or thick steak, two sides, and a decadent dessert</p>","null","null","https://img.grouponcdn.com/deal/3ToRPgKQSoWSpjER3pmQfubfLafx/3T-700x420/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fizzy-s-steaks-and-chops-san-fran%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("$47 for a Prix-Fixe Dinner for Two at Cafe Bastille ($70 Value)  ","Cafe Bastille","37.7911629","-122.4036056","2014-12-16T08:00:00Z","2039-04-21T06:59:59Z","<p>Three-course dinner for two includes soup or salad, a French special, and a dessert</p>","null","null","https://img.grouponcdn.com/deal/bNnKYmxyMognbTap72Yt/pG-960x576/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fcafe-bastille-1%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Recipes & Pre-Measured Ingredients To Cook At Home with HelloFresh (Up to 57% Off)   ","HelloFresh","32.4487","-99.7331","2017-02-23T05:00:00Z","2041-06-29T06:59:59Z","<p>Award-winning, chef-crafted recipes and farm-fresh ingredients delivered to your doorstep make for delicious meals in less than 30 minutes</p>","null","null","https://img.grouponcdn.com/deal/3vAUA7WAbrq6FG9rYhpTD8DXCPF4/3v-1000x600/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fhellofresh-2017-national-1%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("12 Ice Cream Sandwiches with Optional 12 Cookies at It's-It Ice Cream (Up to 45% Off)  ","It's-It Ice Cream","37.594636","-122.3668116","2014-11-17T08:00:00Z","2039-03-23T06:59:59Z","<p>Savor iconic chocolate-dipped ice-cream sandwiches and original oatmeal chocolate dunked cookies made from a 1920s-era recipe</p>","<h4>Choose between Two Options</h4>

<ul>
  <li>$10 for 12 ice cream sandwiches ($18 value)</li>
  <li>$12 for 12 ice cream sandwiches and 12 original oatmeal chocolate dunked cookies ($22 value)</li>
</ul>","Limit 1 per person, may buy 3 additional as gifts. Valid only for option purchased. Dry ice available on site for additional charge. Valid for pickup only.","https://img.grouponcdn.com/deal/hhANacDcCieQ6ZnPzsQJ/dN-700x420/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fit-s-it-cookie-dough-san-jose%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("$33 for Chocolate-Tasting Experience for Two at Alegio Chocolate ($60 Value) ","Alegio Chocolate","37.8798335","-122.2688664","2017-06-18T07:00:00Z","2041-10-22T06:59:59Z","<p>Guides tell visitors the story of Alegio&#8217;s history and African cacao plantation while sharing 12 samples of all-natural chocolate</p>","<ul>
  <li>Chocolate Experience for Two, Includes:
    <ul>
      <li>60-Minute Presentation</li>
      <li>12 Samples</li>
    </ul>
  </li>
</ul>","null","https://img.grouponcdn.com/deal/3i2SXtMJQfTtEZwdQE4Jr9kMvawb/3i-700x420/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Falegio-chocolate-2-8%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("30% Cash Back at Swamp","Swamp","37.7797583","-122.4771972","2018-01-17T08:00:00Z","2042-05-19T07:00:00Z","<p>Get 30% cash back on your first purchase and 10% cash back on all additional purchases</p>","null","null","https://img.grouponcdn.com/deal/4eYuLFKUS8eUPP6Fs5yb/ZA-960x576.jpg/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fswamp-2%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");


INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Dinner Cruise for One or Two from Taste The World Cruises & Festivals (Up to 47% Off)","Taste The World Cruises & Festivals","37.7752","-122.419","2017-12-09T08:00:00Z","2042-04-14T06:59:59Z","<p>During the two- or three-hour cruise, guests can enjoy music and all-you-can-eat food of a featured culture</p>","null","null","https://img.grouponcdn.com/deal/3FrvEaT2w9uisoVez9FNaWXXjEcK/3F-1800x1205/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Ftaste-the-world-3%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Three-Course Cal-Asian Dinner Show for Two at AsiaSF (Up to 35% Off). Two Options Available. ","AsiaSF","37.7749898","-122.4129329","2017-01-21T08:00:00Z","2041-05-27T06:59:59Z","<p>Glamorous transgender divas serve Malaysian diver scallops and filet mignon, and perform professionally choreographed dance numbers</p>","null","null","https://img.grouponcdn.com/deal/2tLy5pDJpZeUxdKrYQ3GtcKtQZAi/2t-2000x1200/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fasiasf-5%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("30-Year Anniversary Celebration: Prix Fixe Dinner at Izzy's Steaks and Chops - San Carlos (Up to 31% Off)","Izzy's Steaks & Chops - San Carlos","37.5142068","-122.2537956","2017-03-29T07:00:00Z","2041-08-02T06:59:59Z","<p>Locally owned and operated restaurant that uses 21-day aged steaks and corn-fed beef is celebrating 30 years in business</p>","null","null","https://img.grouponcdn.com/deal/ooi9qW1LBpYtGoFv7KgEfuMvJsL/oo-700x420/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fizzy-s-steaks-and-chops-san-carlos-2%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("One or Two Weeks of Meal Kit Deliveries from Home Chef (Up to 37% Off)   ","HomeChef.com","32.4487","-99.7331","2017-08-04T04:00:00Z","2041-12-08T07:59:59Z","<p>Weekly boxes delivered to your door include all the ingredients and recipes needed to create gourmet meals in 30 minutes </p>","null","null","https://img.grouponcdn.com/deal/7GVguoRhaKqGRVCaqm2HKtSZ4o6/7G-1202x722/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fhomechef-com-national%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Afternoon Tea for Two or Four at Crown & Crumpet (Up to 23% Off)","Crown & Crumpet","37.785756","-122.430597","2015-09-01T07:00:00Z","2040-01-05T07:59:59Z","<p>Classic English tea service with scones, sweets, savories &amp; finger sandwiches delivered in a relaxed, modern setting at Crown and Crumpet </p>","null","null","https://img.grouponcdn.com/deal/wt6FQVCQr2ptJSubo5XFSA/crown__crumpet-700x420/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fcrown-crumpet-1%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("One or Two Weeks of Meals for Two from Gobble (51% Off)       ","Gobble.com","41.0814","-81.519","2017-10-11T04:00:00Z","2042-02-14T07:59:59Z","<p> Fresh, simple, healthy ingredients perfectly portioned and delivered to your doorstep so you can create dinner in 15 minutes</p>","null","null","https://img.grouponcdn.com/deal/BRmGou69rACqEEMJLJCJcjN4f1S/BR-1000x600/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fgobble-com-4%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Brunch with Bottomless Mimosas or Gastropub Cuisine at The Polo Grounds (Up to 55% Off). Two Options Available.","The Polo Grounds","37.7785168","-122.3920417","2016-11-20T08:00:00Z","2041-03-26T06:59:59Z","<p>Neighborhood gastropub serves brunch, lunch, and dinner</p>","<h4>Choose Between Two Options</h4>
<ul>
  <li>$27 for brunch for two, with two brunch entrees, and two bottomless mimosas ($60 value)</li>
  <li>$14.99 for $25 towards food and drink for two or more</li>
</ul>","null","https://img.grouponcdn.com/deal/ta1XVaDoGTf22KnwTpa2ye/140385408-2046x1228/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fthe-polo-grounds-6%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("One or Two Mini-Mushroom Farms, or 2oz of Dried Chanterelles at Far West Fungi (Up to 54% Off)","Far West Fungi","37.7955703","-122.3933208","2014-10-25T07:00:00Z","2039-02-28T07:59:59Z","<p>Growing kits include simple instructions and produce up to 2 pounds of shitake or tree-oyster mushroom; dried chanterelles used forcooking</p>","null","Limit 1 per person, may buy 1 additional as gift. Valid only for option purchased. All goods or services must be used by the same person. Valid in-store only. Must use promotional value in 1 visit.","https://img.grouponcdn.com/deal/6McyC4BDDMAsZxJkXa5tXF/IMAGE_far-west-fungi-700x420/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Ffar-west-fungi-1%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("$17 for One Box of Delivered Organic Produce from Farm Fresh To You ($33 Value)","Farm Fresh To You","37.7752","-122.419","2016-05-04T07:00:00Z","2040-09-07T06:59:59Z","<p>Enjoy farm-fresh, organic fruits and vegetables brought straight to your door with this delivery service</p>","null","null","https://img.grouponcdn.com/deal/3n2EbjJHdj57o5ZhLhXq7sEQ9tne/3n-960x576/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Ffarm-fresh-to-you-8-39-san-francisco%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");
INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Craft Beer Packages at Triple Voodoo Brewery and Tap Room (Up to 32% Off). Three Options Available.","Triple Voodoo Brewery and Tap Room","37.761192","-122.388504","2017-07-14T07:00:00Z","2041-11-17T07:59:59Z","<p>Expand your palette with up to 16 crafts beers on tap brewed at this premium craft brewery in San Francisco&#8217;s historic Dogpatch neighborhood</p>","null","null","https://img.grouponcdn.com/deal/2RiGu62YjN2qAMu2fo5BQqwwpuGk/2R-700x420/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Ftriple-voodoo-brewery-and-tap-room-1%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Ethiopian Meal for Two or Four at Ethiopia Restaurant in Berkeley (Up to 60% Off)","Ethiopia Restaurant","37.856687","-122.259669","2014-03-21T07:00:00Z","2038-07-25T06:59:59Z","<p>Diners seated around woven baskets use injera flatbread to scoop up lentils, chicken &amp; lamb stewed in imported spices</p>","<h4>Choose Between Two Options</h4>

<ul>
  <li>$23 for one appetizer, two entrees, one dessert, and two glasses of wine ($45.70 value)</li>
  <li>$37 for two appetizers, four entrees, two desserts, and four glasses of wine ($91.40 value)</li>
</ul>","null","https://img.grouponcdn.com/deal/j3tyypGSDjuN628aJWtv/84-2048x1229/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fethiopia-restaurant-4%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("One or Two Tasting Flights, Beers of Choice, and Take Home Glasses at Gilman Brewing Company (Up to 35% Off)","Gilman Brewing Company","37.8795162","-122.2997978","2017-08-18T07:00:00Z","2041-12-22T07:59:59Z","<p>Professional brewery specializing in saisons offers a variety of services including tasting flights, beers ofchoice, and take home glasses </p>","<p>Choice of:</p>

<ul>
  <li>One Tasting Flight, Beer of Choice, and Take Home Glass</li>
  <li>Two Tasting Flights, Two Beers of Choice, and Take Home Glasses</li>
</ul>","null","https://img.grouponcdn.com/deal/3Sysi4FTPpP8YoZHWunAFgvjLKKM/3S-960x576/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fgilman-brewing-co%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Distillery Tour and Tasting for Two or Four at Tripp Distillery (50% Off) ","Tripp Distillery","37.6425407","-122.4925656","2017-07-09T07:00:00Z","2041-11-12T07:59:59Z","<p>A family-owned distillery masterfully distills organic ingredients in a hand-made, 220-gallon still</p>","<p>Choice of:</p>

<ul>
  <li>Distillery Tour and Tasting for Two</li>
  <li>Distillery Tour and Tasting for Four</li>
</ul>

<p>Live whiskey-making included.</p>

<p>Open Saturday–Sunday from 12 p.m.–6 p.m.</p>","May be repurchased every 180 days. Must provide 21+ ID to receive alcoholic beverages. Limit 1 per person, maybuy 1 additional as gift. Limit 1 per visit. Valid only for option purchased. Open Saturday–Sunday from 12 p.m.–6 p.m.","https://img.grouponcdn.com/deal/2XN9R17dQL2eFFtfeJqptxksGorg/2X-700x420/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fthe-tripp-distillery%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Prix Fixe Dinner for Two or Four at Molcajete Cocina Mexicana (Up to 38% Off)","Molcajete Cocina Mexicana","37.8061075","-122.2666396","2016-08-29T07:00:00Z","2041-01-02T07:59:59Z","<p>We use the best locally-grown organic ingredients and have 25-varieties of fresh-made molcajete salsa</p>","null","Limit 1 per person. Limit 1 per visit. Limit 1 per table. Valid only for option purchased. Entire value must be used in one visit. Valid for dinner only. Valid for dine-in only. Tax not included. May be repurchased every 30 days.","https://img.grouponcdn.com/deal/2HAfaezuPBA57rJtX5hD99wjhBGG/2H-700x420/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fmolcajete-cocina-mexicana%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");

INSERT INTO `deals` (`deal_title`,`merchant_name`,`merchant_lat`,`merchant_lng`,`starts`,`ends`,`highlights`,`pitch`,`fine_print`,`img_url`,`deal_url`) VALUES("Asian Fusion Cuisine at Azit (Up to 40% Off). Two Options Available.  ","Azit","37.8320496","-122.2630479","2016-03-24T07:00:00Z","2040-07-28T06:59:59Z","<p>Korean-centric menu features kimchi fried rice, spicy pork pancakes, mussel soup, fried chicken skewers, and Japanese-style nachos</p>","<h4>Choose Between Two Options</h4>

<ul>
  <li>$24 for $40 worth of food for two or more, valid Sunday–Thursday</li>
  <li>$26 for $40 worth of food for two or more, valid any day</li>
</ul>","Limit 1 per person. Limit 1 per visit. Valid only for option purchased. Limit 1 per table. Not valid with daily specials or other offers. Valid only fordine-in, not valid for carry-out. May be repurchased every 30 days.","https://img.grouponcdn.com/deal/33rjexUWtPYmSVsUcwyZ/mj-2048x1227/v1/t300x182.jpg","http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fazit%3Fz%3Dskip%26utm_medium%3Dafl%26utm_campaign%3D201236%26mediaId%3D212556%26utm_source%3DGPN");