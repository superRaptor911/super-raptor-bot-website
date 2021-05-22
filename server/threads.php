<?php
include('database.php');


function getThread() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
        'thread'  => array()
    );
    if (empty($_POST["threadID"])) {
        $return_val['result'] = false;
        $return_val['err'] = "*threadID not set";
        return $return_val;
    }

    $threadID = $_POST["threadID"];

    $conn = connectToDB();
    if (!$conn) {
        $logger = new Logger();
        $logger->addLog(__FUNCTION__, "*Connection to database failed.");
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }
    // SQL DB
    $sql = "SELECT * FROM threads WHERE threadID='$threadID'";
    $result = $conn->query($sql);
    if (!$result) {
        $return_val['result'] = false;
        $return_val['err'] = "Error failed to get, " . $conn->error;
        return $return_val;
    }
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $row["thread"] = htmlspecialchars_decode($row['thread'], ENT_QUOTES);
        $return_val['thread'] = $row;
    }
    return $return_val;
}



function getThreadList() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
        'threads'  => Array()
    );

    if (empty($_POST["name"])) {
        $return_val['result'] = false;
        $return_val['err'] = "*name not set";
        return $return_val;
    }

    $name = $_POST["name"];
    $conn = connectToDB();
    if (!$conn) {
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }

    $sql = "SELECT name,threadID,title FROM threads WHERE name = '$name'";
    $result = $conn->query($sql);
    if (!$result) {
        $return_val['result'] = false;
        $return_val['err'] = "Error failed to get, " . $conn->error;
        return $return_val;
    }
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
           array_push($return_val['threads'], $row);
        }
    }

    return $return_val;
}

function addThread() {
    // Return value
    $return_val = array(
        'result' => true, // success
        'err'    => "",   // err msg
    );

    if (empty($_POST["threadID"])) {
        $return_val['result'] = false;
        $return_val['err'] = "*threadID not set";
        return $return_val;
    }
    if (empty($_POST["name"])) {
        $return_val['result'] = false;
        $return_val['err'] = "*name not set";
        return $return_val;
    }
    if (empty($_POST["title"])) {
        $return_val['result'] = false;
        $return_val['err'] = "*name not set";
        return $return_val;
    }


    $name = $_POST["name"];
    $threadID = $_POST["threadID"];
    $thread = $_POST["thread"];
    $title = $_POST["title"];

    $conn = connectToDB();
    if (!$conn) {
        $return_val['result'] = false;
        $return_val['err'] = "*Connection to database failed.";
        return $return_val;
    }

    $thread = $conn->real_escape_string($thread);
    $title = $conn->real_escape_string($title);

    $sql = "INSERT INTO threads(name, threadID, thread, title) VALUES('$name', '$threadID', '$thread', '$title')";
    $result = $conn->query($sql);
    if (!$result) {
        $return_val['result'] = false;
        $return_val['err'] = "Error failed to add thread, " . $conn->error;
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
case 'getThread':
    echo json_encode(getThread());
    break;

case 'listThreads':
    echo json_encode(getThreadList());
    break;

case 'addThread':
    echo json_encode(addThread());
    break;

default:
    echo json_encode(showInvalidRequest("INVALID_TYPE $type"));
    break;
}

?>
