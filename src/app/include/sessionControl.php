<?php

session_set_cookie_params(
    SES_LIFE_TIME,
    SES_PATH,
    SES_DOMEIN,
    SES_SECURE,
    SES_HTTP_ONLY
);

session_start();
