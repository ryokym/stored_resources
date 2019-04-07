<?php
namespace Common;

class Constants
{

    /*********************
    * ACCOUNT            *
    *********************/

    /* UserData FilePath
    -------------------------------------------------*/
    // ResistedAccountlist
    public const UD_FILE = UD_FILE;

    // ResistedTokenlist
    public const TL_FILE = TL_FILE;

    /* TOKEN String length
    -------------------------------------------------*/
    // MIN
    public const TOKEN_MIN_LENGTH = 25;

    // MAX
    public const TOKEN_MAX_LENGTH = 32;

    /* Application Setting Status
    --------------------------------------------*/
    // SESSION key for status
    public const STATUS = 'status';

    // Application available
    public const OK = OK;

    // Application not available
    public const NG = NG;

    /*********************
    * S3                 *
    *********************/

    /* S3\Action/ Change
    -------------------------------------------------*/
    // MAX LINE
    public const LIMIT_LINE = 5000;

    public const S3_PROTOCOL = S3_PROTOCOL;

    /* S3\Action/ Upload
    -------------------------------------------------*/
    // Minimum number of size in uploaded file
    public const MIN_FILE_SIZE = 0;

    // Maximum number of characters in uploaded file
    public const MAX_LENGTH = 40;

    // Name of file to be excluded
    public const EXCLUDED_PATTERN = '/^[A-Za-z0-9_\-.()?!&\[\]]*$/';
}
