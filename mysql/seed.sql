START TRANSACTION;

-- avatar_info table stores the profile picture hash

CREATE TABLE `avatar_info` (
  `avatar_hash` char(12) DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL
);

INSERT INTO `avatar_info` (`avatar_hash`, `last_updated`) VALUES
('000000000000', '2023-02-20 14:39:15');

-- chat_ids table stores the chat ids that are subscribed to the bot

CREATE TABLE `chat_ids` (
  `chat_id` bigint(20) DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL
);

INSERT INTO `chat_ids` (`chat_id`, `last_updated`) VALUES
(-1001609408550, '2023-02-20 15:11:48');
COMMIT;
