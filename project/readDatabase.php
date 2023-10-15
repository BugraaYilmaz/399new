<?php
$serverName="localhost";
$userName="root";
$password="";
$dbName="yenipersonel";
$conn=mysqli_connect($serverName,$userName,$password,$dbName);
if(mysqli_connect_errno()){
  echo "\nError Cannot connect to the database!";
  exit();
}else{
  // echo "\nSuccessfully connected to the database.<br><br>";
}
$sql="SELECT * FROM yenipersonelformu;";
$returnedData=mysqli_query($conn,$sql);
$array=mysqli_fetch_all($returnedData,MYSQLI_ASSOC);

//getting the number of rows
$getQuery=$conn->query($sql);
$numRows=$getQuery->field_count;

$headerArray=[
   
"Adı Soyadı",
"TC Kimlik",
"Sicil Numarası",
"İşe Giriş Tarihi",
"Grup/Birim",
"Kişi İmza",
"Kadro Unvanı",
"Sendika Kadro Durumu",
"Görev/Projeler",
"Telefon Talep",
"Verilen Telefon Numarası",
"Etki Alanı Talep",
"Açılan Kullanıcı Adı",
"İç E-Posta Talep",
"Açılan İç E-Posta",
"Dış E-Posta Talep",
"Açılan Dış E-Posta",
"YBS Hesap",
"EBYSHesap",
"Veritabanı Girişi",
"Kişi Güvenlik Grup Lideri",
"El Yazısı",
"Kişi Güvenlik Belgesi Girişi",
"Eğitim Kaynak Yönetimi",
"Grup/Birim Eğitimi",
"El Yazısı İmza",
"Kişi Güvenlik İmza",
"Kaynak İmza",
"Birim Eğitim İmza"
];



?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Database</title>
  <style>
  table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
  min-width: 200px;
}

table tr:nth-child(odd){
  background-color:#8BA09A;
}
.hdr{
  background-color:#96C15D !important;
}


</style>
</head>
<body>
<table>
  <tr class="hdr">
    <?php for($i=0;$i<$numRows;$i++){  ?>
        <td><?php  echo $headerArray[$i]  ?></td>
      <?php }  ?>

  </tr>
<?php foreach ($array as $eachArray){  ?>
  <tr>
  <?php foreach($eachArray as $each){ ?>
    <td><?php echo $each ?></td>
    <?php }?>
  </tr>
  <?php }?>
</table>
</body>
</html>