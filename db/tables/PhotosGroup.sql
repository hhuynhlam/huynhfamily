DROP TABLE IF EXISTS `PhotosGroup`;

CREATE TABLE `PhotosGroup` (
    `pgid` int(11) NOT NULL AUTO_INCREMENT,
    `groupName` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`pgid`)
);