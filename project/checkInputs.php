
  <?php
  header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); 
    // $jsonData=$_COOKIE["allInputs"];
    // print_r($_POST);
    $jsonData=$_POST["encryptedJson"];
    $arr=json_decode($jsonData,true);
    $nameSurname=$arr[0];
    $tcKimlik=$arr[1];
    $sicilNum=$arr[2];
    $iseGirisDate=$arr[3];//array
    $grupBirim=$arr[4];
    $kisiImza=$arr[5];
    $kadroUnvan=$arr[6];
    $sendikaKadro=$arr[7];
    $gorevalacagiProjeler=$arr[8];
    $telefonTalep=$arr[9];//m array
    $etkiAlani=$arr[10];//m array
    $icEposta=$arr[11];//m array
    $disEposta=$arr[12];//m array 
    $ybsHesap=$arr[13];
    $ebysHEsap=$arr[14];
    $veriTabaniDurum=$arr[15];
    $kisiGuvenlikBelge1=$arr[16];
    $elYazisi=$arr[17];
    $kisiGuvenlikGirisim=$arr[18];
    $egitimKaynakYonetim=$arr[19];
    $birimEgitim=$arr[20];
    $imzaArray=$arr[21];//array

    $stopTransfer=false;
    foreach($arr as $elem){
      if($elem==""){
        echo "Error! there are empty slots!";
        $stopTransfer=true;
        break;
      }
    }
    
    
    $nameSurnameWithoutSpace=str_replace(" ","",$nameSurname);
    if(!preg_match('/^\p{L}+$/u', $nameSurnameWithoutSpace)&&$nameSurname!=""){
      echo "Error! Name-Surname can't contain any numbers.";
      $stopTransfer=true;
    }

    
    if(!ctype_digit($tcKimlik)&&$tcKimlik!=""){
      if(strlen($tcKimlik)!= 11){
        echo "Error TC-Kimlik should be 11 digits";
      }
      else{
        echo "Error TC-Kimlik can't contain any strings.";
      }
      $stopTransfer=true;
    }
    else if(strlen($tcKimlik)!= 11 &&$tcKimlik!=""){
      echo "Error TC-Kimlik should be 11 digits";
      $stopTransfer=true;
    }


    if(strlen($sicilNum)!=13&&$sicilNum!=""){
      echo("Error! Sicil Number should be 13 digits.");
      $stopTransfer=true;
    }
    else if(!ctype_digit($sicilNum)&&$sicilNum!=""){
      echo "Error! Sicil Number Can't contain any strings.";      
      $stopTransfer=true;
    }
    
    $grupBirimWithoutSpace=str_replace(" ","",$grupBirim);
    if(!preg_match('/^\p{L}+$/u', $grupBirimWithoutSpace)&&$grupBirim!=""){
      echo "Error! Gurup/Birim can't contain any numbers.";
      $stopTransfer=true;
    }

  
    if(stripos($kadroUnvan,"Diğer:")!==false){ 
      if(!(mb_strlen($kadroUnvan)>6)){
        echo ("Error! in Kadrosu/Unvanı diğer value should be provided.");
        $stopTransfer=true;
      }
    }

  
  
    function multiLayerCheck($var,$choice,$secondChoice){
      if(($var!="")&&($var["Selection"]==$choice)){
        if(count($var)==2){
          if($var[$secondChoice]==""){
            echo "Error! second index should be filled. With the selection: ".$var["Selection"];
            $stopTransfer=true;
          }
        }
        else{
          echo "Error! second index should be filled. With the selection: ".$var["Selection"];
          $stopTransfer=true;
        }
      }
    }
    multiLayerCheck($telefonTalep,"Var","givenPhoneNumber");
    multiLayerCheck($etkiAlani,"Açılacak","givenUserName");
    multiLayerCheck($icEposta,"Açılacak","AçılanEposta");
    multiLayerCheck($disEposta,"Açılacak","AçılanEposta");


    if(count($imzaArray)!=4){
      echo "Error! imzalar tam olmalıdır.";
      $stopTransfer=true;
    }

    //Connecting to the database
    $serverName="localhost";
    $userName="root";
    $password="";
    $dbName="yenipersonel";
    $conn=mysqli_connect($serverName,$userName,$password,$dbName);
    if(mysqli_connect_errno()){
      echo "\nError Cannot connect to the database!";
      exit();
    }else{
      echo "\nSuccessfully connected to the database.";
    }
    
    

    
    
    if($stopTransfer==false){
      echo "Form is complete!";
      transferToDataBase();
    }
    else{
      echo "\n Error! There are empty/wrong spaces in the form";
      $stopTransfer=false;
    }

    

    function transferToDataBase(){
      global $nameSurname,
       $tcKimlik,
       $sicilNum,
       $iseGirisDate,
       $grupBirim,
       $kisiImza,
       $kadroUnvan,
       $sendikaKadro,
       $gorevalacagiProjeler,
       $ybsHesap,
       $ebysHEsap,
       $veriTabaniDurum,
       $kisiGuvenlikBelge1,
       $elYazisi,
       $kisiGuvenlikGirisim,
       $egitimKaynakYonetim,
       $birimEgitim,
       $imzaArray,
       $telefonTalep,
       $etkiAlani,
       $icEposta,
       $disEposta,
       $telefonTalepSonuc,
       $etkiAlaniSonuc,
       $icEpostaSonuc,
       $disEpostaSonuc,
       $conn;
    //determining the data
    function multiLevel($arr,$arr2nd){
      if($arr["Selection"]=="Var"||$arr["Selection"]=="Açılacak"){
        if((count($arr))==2){
          return ($arr["$arr2nd"]);
        } 
      }
      else{
        return ("-----");
      }
    }
    $telefonTalepSonuc=multiLevel($telefonTalep,"givenPhoneNumber");
    $etkiAlaniSonuc=multiLevel($etkiAlani,"givenUserName");
    $icEpostaSonuc=multiLevel($icEposta,"AçılanEposta");
    $disEpostaSonuc=multiLevel($disEposta,"AçılanEposta");
    $telefonTalep2=$telefonTalep["Selection"];
    $etkiAlani2=$etkiAlani["Selection"];
    $icEposta2=$icEposta["Selection"];
    $disEposta2=$disEposta["Selection"];
    $iseGirisDate2 = implode('-', $iseGirisDate);


    //inserting data
    $sql="INSERT INTO 
    yenipersonelformu
    (
    adiSoyadi,
    tcKimlik,
    sicilNumarasi,
    iseGirisTarih,
    grubuBirimi,
    kisiImza,
    kadroUnvan,
    sendikaKadroDurumu,
    gorevProjeler,
    ybsHEsap,
    EBYSHesap,
    veriTabaniGiris,
    kisiGuvenlikGrupLideri,
    elYazisi,
    kisiGuvenlikBelgesiGirisim,
    egitimKaynakYonetim,
    grupBirimEgitimi,
    elYazisiImza,
    kisiGuvenlikImza,
    kaynakImza,
    birimEğitimImza,
    telefonTalep,
    etkiAlaniTalep,
    icEpostaTalep,
    disEpostaTalep,
    verilenTelNo,
    acilanUsername,
    acilanIcEposta,
    acilanDisEposta

    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";


    



    $stmt=$conn->prepare($sql);
    $stmt->execute(
    [$nameSurname,
    $tcKimlik,
    $sicilNum,
    $iseGirisDate2,
    $grupBirim,
    $kisiImza,
    $kadroUnvan,
    $sendikaKadro,
    $gorevalacagiProjeler,
    $ybsHesap,
    $ebysHEsap,
    $veriTabaniDurum,
    $kisiGuvenlikBelge1,
    $elYazisi,
    $kisiGuvenlikGirisim,
    $egitimKaynakYonetim,
    $birimEgitim,
    $imzaArray[0],
    $imzaArray[1],
    $imzaArray[2],
    $imzaArray[3],
    $telefonTalep2,
    $etkiAlani2,
    $icEposta2,
    $disEposta2,
    $telefonTalepSonuc,
    $etkiAlaniSonuc,
    $icEpostaSonuc,
    $disEpostaSonuc]
  );
    
    
    

  }
    
  ?>
