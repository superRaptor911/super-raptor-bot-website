<?php
include('database.php');


function getThreadID() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
        'threadID'  => "1"
    );

    if (empty($_POST["botName"])) {
        $return_val['result'] = false;
        $return_val['err'] = "*name not set";
        return $return_val;
    }

    $botName = $_POST["botName"];

    $conn = connectToDB();
    if (!$conn) {
        $logger = new Logger();
        $logger->addLog(__FUNCTION__, "*Connection to database failed.");
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }
    // SQL DB
    $sql = "SELECT * FROM users WHERE botName='$botName'";
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



function setThreadId() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
    );

    if (empty($_POST["botName"])) {
        $return_val['result'] = false;
        $return_val['err'] = "*name not set";
        return $return_val;
    }
    $botName = $_POST["botName"];
    $threadID = $_POST["threadID"];

    $conn = connectToDB();
    if (!$conn) {
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }

    $sql = "INSERT INTO processState(botName, threadID) VALUES('$botName', '$threadID') 
            ON DUPLICATE KEY UPDATE botName = '$botName', threadID = '$threadID'";
    $result = $conn->query($sql);
    if (!$result) {
        $return_val['result'] = false;
        $return_val['err'] = "Error failed to set id, " . $conn->error;
        return $return_val;
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

case 'setThreadId':
    echo json_encode(setThreadId());
    break;

default:
    echo json_encode(showInvalidRequest("INVALID_TYPE $type"));
    break;
}

?>
