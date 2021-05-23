<?php
include('database.php');


function getThreadID() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
        'threadID'  => "1"
    );

    $conn = connectToDB();
    if (!$conn) {
        $logger = new Logger();
        $logger->addLog(__FUNCTION__, "*Connection to database failed.");
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }
    // SQL DB
    $sql = "SELECT threadID from threads ORDER BY threadID DESC LIMIT 1";
    $result = $conn->query($sql);
    if (!$result) {
        $return_val['result'] = false;
        $return_val['err'] = "Error failed to get, " . $conn->error;
        return $return_val;
    }
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $return_val['threadID'] = $row["threadID"];
    }
    return $return_val;
}

function lockThread() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
    );

    $threadID = $_POST["threadID"];

    $conn = connectToDB();
    if (!$conn) {
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }
    $date = date_create();
    $time = date_timestamp_get($date);
    $sql = "INSERT INTO processPool(threadID, time) VALUES('$threadID', $time)";
    $result = $conn->query($sql);
    if (!$result) {
        $return_val['result'] = false;
        $return_val['err'] = "Error failed to set id, " . $conn->error;
        return $return_val;
    }

    return $return_val;
}

function unlockThread() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
    );

    $threadID = $_POST["threadID"];

    $conn = connectToDB();
    if (!$conn) {
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }
    $sql = "DELETE FROM processPool WHERE threadID = '$threadID'";
    $result = $conn->query($sql);
    if (!$result) {
        $return_val['result'] = false;
        $return_val['err'] = "Error failed to unloack thread, " . $conn->error;
        return $return_val;
    }

    return $return_val;
}

function updateBot() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
    );

    $botName = $_POST["botName"];

    $conn = connectToDB();
    if (!$conn) {
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }
    $date = date_create();
    $time = date_timestamp_get($date);
    $sql = "INSERT INTO bots(botName, lastSeen) VALUES('$botName', $time) ON DUPLICATE KEY UPDATE lastSeen=$time";
    $result = $conn->query($sql);
    if (!$result) {
        $return_val['result'] = false;
        $return_val['err'] = "Error failed to set id, " . $conn->error;
        return $return_val;
    }

    return $return_val;
}


function getBotCount() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
        'count'  => 0
    );

    $conn = connectToDB();
    if (!$conn) {
        $logger = new Logger();
        $logger->addLog(__FUNCTION__, "*Connection to database failed.");
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }
    $date = date_create();
    $time = date_timestamp_get($date) - 200;
    // SQL DB
    $sql = "SELECT COUNT(*) AS cnt FROM bots WHERE lastSeen > $time";
    $result = $conn->query($sql);
    if (!$result) {
        $return_val['result'] = false;
        $return_val['err'] = "Error failed to get, " . $conn->error;
        return $return_val;
    }
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $return_val['count'] = $row["cnt"];
    }
    return $return_val;
}

// ------------------Execution starts here-----------------
$_POST = json_decode(file_get_contents('php://input'), true);
if (empty($_POST["type"])) {
    echo json_encode(showInvalidRequest("Type not specified"));
}

$type = $_POST["type"];

switch ($type) {
case 'getThreadID':
    echo json_encode(getThreadID());
    break;

case 'lockThread':
    echo json_encode(lockThread());
    break;

case 'unlockThread':
    echo json_encode(unlockThread());
    break;

case 'ping':
    echo json_encode(updateBot());
    break;

case 'botCount':
    echo json_encode(getBotCount());
    break;

default:
    echo json_encode(showInvalidRequest("INVALID_TYPE $type"));
    break;
}

?>
