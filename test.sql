CREATE TABLE `event_list` (
    `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'イベントリストID',
    ---
    `operator_name` varchar(64) NOT NULL COMMENT 'オペレーター名',
    `location_name` varchar(64) NOT NULL COMMENT '拠点名',
    `operator_cognito_user_id` varchar(64) NOT NULL COMMENT 'オペレータcognitoUserID(resoceID)',
    `location_cognito_user_id` varchar(64) NOT NULL COMMENT '拠点cognitoUserID',
    ---
    `start` datetime NOT NULL COMMENT '予定開始時刻',
    `end` datetime NOT NULL DEFAULT COMMENT '予定終了時刻',
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT '',
    ---
    PRIMARY KEY (`id`),
    KEY `location_cognito_index` (`location_cognito_user_id`),
    KEY `operator_cognito_index` (`operator_cognito_user_id`)
) ENGINE InnoDB,
CHARSET utf8mb4,
COLLATE utf8mb4_unicode_ci COMMENT 'イベントリスト';