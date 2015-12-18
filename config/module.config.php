<?php
return [
    /**
     * Config for allowing dynamic loading of public assets
     */
    'asset_manager' => [
        'resolver_configs' => [
            'aliases' => [
                'modules/rcm-user/' => __DIR__ . '/../public/',
            ],
            // @todo implement this
            //'collections' => [
            //    'modules/rcm-user/rcm-user.js' => [
            //    ],
            //    'modules/admin/rcm-user/rcm-user.js' => [
            //    ],
            //],
        ],
    ],
    /**
     * Configuration
     */
    'RcmUser\\Ui' => [
    ],
    'service_manager' => [
        'factories' => [

        ]
    ],
];
