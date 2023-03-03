CREATE TABLE `event_list` (
    `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'イベントID',
    -- cognito情報
    `operator_name` varchar(64) NOT NULL COMMENT 'オペレーター名',
    `location_name` varchar(64) NOT NULL COMMENT '拠点名',
    `operator_cognito_user_id` varchar(64) NOT NULL COMMENT 'オペレータcognitoUserID(resoceID)',
    `location_cognito_user_id` varchar(64) NOT NULL COMMENT '拠点cognitoUserID',
    -- イベント情報
    `title` varchar(64) COMMENT 'タイトル',
    `location_memo` varchar(512) COMMENT '拠点のメモ',
    `operator_memo` varchar(512) COMMENT 'オペレーターのメモ',
    `avatar` varchar(64) COMMENT 'アバター名',
    `start` datetime NOT NULL COMMENT '予定開始時刻',
    `end` datetime NOT NULL COMMENT '予定終了時刻',
    --
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT 'イベント作成日時',
    PRIMARY KEY (`id`),
    KEY `location_cognito_index` (`location_cognito_user_id`),
    KEY `operator_cognito_index` (`operator_cognito_user_id`)
) ENGINE InnoDB,
CHARSET utf8mb4,
COLLATE utf8mb4_0900_ai_ci COMMENT 'イベントリスト';

CREATE TABLE `user_log` (
    `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ログイン履歴ID',
    `company_cognito_user_id` varchar(64) NOT NULL COMMENT '企業cognitoUserID',
    `cognito_user_id` varchar(64) NOT NULL COMMENT '拠点とオペレータcognitoUserID',
    `user_type` enum('LOCATION', 'OPERATOR') NOT NULL COMMENT 'ユーザータイプ',
    `action_type` enum('LOGIN', 'LOGOUT') NOT NULL COMMENT 'ログインかログアウト',
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT 'ログイン・ログアウト登録日時',
    PRIMARY KEY (`id`),
    KEY `cognito_index` (`cognito_user_id`),
    KEY `company_cognito_index` (`company_cognito_user_id`)
) ENGINE InnoDB,
CHARSET utf8mb4,
COLLATE utf8mb4_0900_ai_ci COMMENT 'ログイン履歴';