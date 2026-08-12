<?php

namespace App\Traits;

trait HttpResponse
{

    public function sendResponse($result, $message, $code = 200)
    {
        $response = [
            'success' => $message,
            'data'    => $result,
        ];
        return response()->json($response, $code);
    }


    public function sendError($error, $errorMessages = [], $code = 400)
    {
        $response = [
            'error' => $error,
        ];
        if(!empty($errorMessages)){
            $response['message'] = $errorMessages;
        }
        return response()->json($response, $code);
    }
}