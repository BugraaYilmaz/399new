const body = document.querySelector('body');
const header = body.querySelector('header');
// const tables = body.querySelectorAll('article');
const contEditables = body.querySelectorAll('td[contenteditable]');
const applyBtn = body.querySelector('#apl');
const datePicker = body.querySelector('#date');
const radioButtonsG1 = body.querySelectorAll('[name=group1]');
const radioButtonsG2 = body.querySelectorAll('input[name=group2]');
const radioButtonsG3 = body.querySelectorAll('input[name=group3]');
const telNoSearch = body.querySelector('.telSearch');
const radioButtonsG4 = body.querySelectorAll('input[name=group4]');
const userNameSearch = body.querySelector('.uNS');
const radioButtonsG5 = body.querySelectorAll('input[name=group5]');
const insEmailSearch = body.querySelector('.ic');
const radioButtonsG6 = body.querySelectorAll('input[name=group6]');
const disEmailSearch = body.querySelector('.dis');
const radioButtonsG7 = body.querySelectorAll('input[name=group7]');
const radioButtonsG8 = body.querySelectorAll('input[name=group8]');
const radioButtonsG9 = body.querySelectorAll('input[name=group9]');
const radioButtonsG10 = body.querySelectorAll('input[name=group10]');
const allSign = body.querySelectorAll('.src');
const radioButtonsG11 = body.querySelectorAll('input[name=group11]');
const girismCheckbox = body.querySelector('.girisim');
const radioButtonsG12 = body.querySelectorAll('input[name=group12]');
const radioButtonsG13 = body.querySelectorAll('input[name=group13]');
const deleteButton = body.querySelector('.dltInpBtn');
const backDrop = body.querySelector('.backdrop');
const popUp = body.querySelector('.popup');
const popUpButton = popUp.querySelector('button');
const popUp2= body.querySelector(".popup2");
const popUpButton2 = popUp2.querySelector('button');
const errorPopUpText=popUp2.querySelector("#errorPopupText");
let nameSurname;
let idNumber;
let sicilNum;
let startDateObject;
let grupBirim;
let userSign;
let kadroUnvan;
let sendikaKadro;
let gorevAlacagiProjeler;
let telefonBaglantıTalep;
let userName;
let icEposta;
let disEposta;
let ybsHesabi;
let ebysHesabi;
let veriTabani;
let guvenlikBelgesi;
let last4Signs = [];
let elYazisi;
let kisiGuvenlikBelgeGirisim;
let egitimKaynak;
let grupEgitim;
let serverResponseStatus;

const isEnteredNameS = () => {
  const nameSurnameEmptySpace = contEditables[0].textContent;

  if (
    nameSurnameEmptySpace === nameSurnameEmptySpace.replace(/[^\p{L}\s]/gu, '')
  ) {
    if (nameSurnameEmptySpace) {
      nameSurname = nameSurnameEmptySpace;
      console.log(nameSurname);
    } else {
      alert("Can't be empty string under Adı-Soyadı.");
    }
  } else {
    alert(
      'Error. You entered numbers in Name-Surname please enter only strings'
    );
  }
};
const isEnteredIdNo = () => {
  const idNoEmptySpaceEnteredString = contEditables[1].textContent;
  if (
    idNoEmptySpaceEnteredString ===
    idNoEmptySpaceEnteredString.replace(/[^\d.]/g, '')
  ) {
    if (
      idNoEmptySpaceEnteredString &&
      idNoEmptySpaceEnteredString.length === 11
    ) {
      idNumber = parseInt(idNoEmptySpaceEnteredString);
      console.log(idNumber);
    } else {
      alert("Can't be empty/Smaller than 11 digits in T.C. Kimlik No.");
    }
  } else {
    alert(
      'Error. You entered strings in T.C. Kimlik No please enter only numbers.'
    );
  }
};
const isEneteredSicilNo = () => {
  const sicilNoString = contEditables[2].textContent;
  if (sicilNoString === sicilNoString.replace(/[^\d.]/g, '')) {
    if (sicilNoString && sicilNoString.length === 13) {
      sicilNum = parseInt(sicilNoString);
      console.log(sicilNoString);
    } else {
      alert("Enetred Sicil Numarasi can'be smaller then 13 digits.");
    }
  } else {
    alert("Sicil Numarasi can't contain any strings.");
  }
};
const isEnteredStartDate = () => {
  if (datePicker.value) {
    let startDate = datePicker.value;
    let startDateArray = startDate.split('-').map(Number);
    startDateObject = {
      Date: startDateArray[2],
      Month: startDateArray[1],
      Year: startDateArray[0],
    };
    console.log(startDateObject);
  } else {
    alert('Please enter a valid date.');
  }
};

const isEnteredSignature = () => {
  const signature = contEditables[3].textContent;
  if (signature) {
    userSign = signature;
    console.log(userSign);
  } else {
    alert('Enter signature!');
  }
};

const isEnteredBirim = () => {
  const enteredGrup = contEditables[4].textContent;
  if (enteredGrup === enteredGrup.replace(/[^\p{L}\s]/gu, '')) {
    if (enteredGrup) {
      grupBirim = enteredGrup;
      console.log(grupBirim);
    } else {
      alert('Grup/Birim Boş bırakılamaz.');
    }
  } else {
    alert('Only enter string in Grubu/Birimi.');
  }
};
const isEnteredKadro = () => {
  let chosenRadioObj;
  for (eachRadio of radioButtonsG1) {
    if (eachRadio.checked) {
      chosenRadioObj = eachRadio;
      break;
    }
  }
  if (!!chosenRadioObj) {
    const parentRadio = chosenRadioObj.parentElement;
    let kadro = parentRadio.textContent;
    if (kadro == ' Diğer:') {
      const searchBox = parentRadio.querySelector('input[type=search]');
      if (searchBox.value) {
        kadro = 'Diğer:' + searchBox.value;
      } else {
        alert("Error! Diğer's box on Kadro/Unvan can't be empty.");
        return;
      }
    }
    kadroUnvan = kadro;
    console.log(kadroUnvan);
  } else {
    alert('Hata! Kadro/Unvan girilmedi.');
  }
};
const isEnteredSendika = () => {
  let checkedRadio;
  for (eachRadio of radioButtonsG2) {
    if (eachRadio.checked) {
      checkedRadio = eachRadio;
      break;
    }
  }
  if (!!checkedRadio) {
    let parentRadio = checkedRadio.parentElement;
    sendikaKadro = parentRadio.textContent;
    console.log(sendikaKadro);
  } else {
    alert('Hata! Sendika&Kadro boş olamaz.');
  }
};

const isEnteredGorevProje = () => {
  let enteredText = contEditables[5].textContent;
  if (enteredText) {
    gorevAlacagiProjeler = enteredText;
    console.log(gorevAlacagiProjeler);
  } else {
    alert('Görev Alacağı Proje(ler) boş olamaz.');
  }
};
let isEnteredTelefonBaglanti = () => {
  let chosenBoxText;
  let checkedBoxObj;
  for (element of radioButtonsG3) {
    if (element.checked) {
      checkedBoxObj = element;
      break;
    }
  }
  if (checkedBoxObj) {
    const parentBox = checkedBoxObj.parentElement;
    chosenBoxText = parentBox.textContent;
    if (chosenBoxText == 'Var') {
      let givenPhoneNum = telNoSearch.value;
      if (givenPhoneNum) {
        telefonBaglantıTalep = {
          Selection: chosenBoxText,
          givenPhoneNumber: givenPhoneNum,
        };
        console.log(telefonBaglantıTalep);
      } else {
        alert('Verilen Telefon Numarasını Girin.');
      }
    } else {
      telefonBaglantıTalep = { Selection: 'Yok' };
      console.log(telefonBaglantıTalep);
    }
  } else {
    alert('Telefon bağlantı talebi girilmelidir.');
  }
};

const isEnteredUserName = () => {
  let chosenBoxText;
  let checkedBoxObj;
  for (element of radioButtonsG4) {
    if (element.checked) {
      checkedBoxObj = element;
      break;
    }
  }
  if (!!checkedBoxObj) {
    const parentBox = checkedBoxObj.parentElement;
    chosenBoxText = parentBox.textContent;
    if (chosenBoxText == 'Açılacak') {
      let givenUserName = userNameSearch.value;
      if (givenUserName) {
        userName = {
          Selection: chosenBoxText,
          givenUserName: givenUserName,
        };
        console.log(userName);
      } else {
        alert('Açılan Kullanıcı Adını Girin.');
      }
    } else {
      userName = { Selection: 'Açılmayacak' };
      console.log(userName);
    }
  } else {
    alert('Etki Alanı Kullanıcı Hesabı girilmelidir.');
  }
};
const isEnteredIcEposta = () => {
  let chosenBoxText;
  let checkedBoxObj;
  for (element of radioButtonsG5) {
    if (element.checked) {
      checkedBoxObj = element;
      break;
    }
  }
  if (!!checkedBoxObj) {
    const parentBox = checkedBoxObj.parentElement;
    chosenBoxText = parentBox.textContent;
    if (chosenBoxText == 'Açılacak') {
      let givenEposta = insEmailSearch.value;
      if (givenEposta) {
        icEposta = {
          Selection: chosenBoxText,
          AçılanEposta: givenEposta,
        };
        console.log(icEposta);
      } else {
        alert('Açılan E-posta adresini girin..');
      }
    } else {
      icEposta = { Selection: 'Açılmayacak' };
      console.log(icEposta);
    }
  } else {
    alert('İç E-posta Hesabı girilmelidir.');
  }
};

const isEnteredDisEPosta = () => {
  let chosenBoxText;
  let checkedBoxObj;
  for (element of radioButtonsG6) {
    if (element.checked) {
      checkedBoxObj = element;
      break;
    }
  }
  if (!!checkedBoxObj) {
    const parentBox = checkedBoxObj.parentElement;
    chosenBoxText = parentBox.textContent;
    if (chosenBoxText == 'Açılacak') {
      let givenEposta = disEmailSearch.value;
      if (givenEposta) {
        disEposta = {
          Selection: chosenBoxText,
          AçılanEposta: givenEposta,
        };
        console.log(disEposta);
      } else {
        alert('Açılan E-posta adresini girin..');
      }
    } else {
      disEposta = { Selection: 'Açılmayacak' };
      console.log(disEposta);
    }
  } else {
    alert('Dış E-posta Hesabı girilmelidir.');
  }
};
const isEnteredYBS = () => {
  let checkedRadio;
  let parentCheckedRadio;
  for (radioBtn of radioButtonsG7) {
    if (radioBtn.checked) {
      checkedRadio = radioBtn;
      parentCheckedRadio = checkedRadio.parentElement;
      break;
    }
  }
  if (parentCheckedRadio) {
    ybsHesabi = parentCheckedRadio.textContent;
    console.log(ybsHesabi);
  } else {
    alert('YBS Hesabı seçeneği seçilmelidir.');
  }
};
const isEnteredEBYS = () => {
  let checkedRadio;
  let parentCheckedRadio;
  for (radioBtn of radioButtonsG8) {
    if (radioBtn.checked) {
      checkedRadio = radioBtn;
      parentCheckedRadio = checkedRadio.parentElement;
      break;
    }
  }
  if (parentCheckedRadio) {
    ebysHesabi = parentCheckedRadio.textContent;
    console.log(ebysHesabi);
  } else {
    alert('EBYS Hesabı seçeneği seçilmelidir.');
  }
};
const isEnteredVeriTabani = () => {
  let checkedRadio;
  let parentCheckedRadio;
  for (radioBtn of radioButtonsG9) {
    if (radioBtn.checked) {
      checkedRadio = radioBtn;
      parentCheckedRadio = checkedRadio.parentElement;
      break;
    }
  }
  if (parentCheckedRadio) {
    veriTabani = parentCheckedRadio.textContent;
    console.log(veriTabani);
  } else {
    alert('Veri Tabanına Giriş Durumu seçeneği seçilmelidir.');
  }
};
const isEnteredGuvenlikBelgesi = () => {
  let checkedRadio;
  let parentCheckedRadio;
  for (radioBtn of radioButtonsG10) {
    if (radioBtn.checked) {
      checkedRadio = radioBtn;
      parentCheckedRadio = checkedRadio.parentElement;
      break;
    }
  }
  if (parentCheckedRadio) {
    guvenlikBelgesi = parentCheckedRadio.textContent;
    console.log(guvenlikBelgesi);
  } else {
    alert('Kişi Güvenlik Belgesi seçeneği seçilmelidir.');
  }
};
const isEnteredSigns = () => {
  let flag = false;
  last4Signs.length = 0;
  for (eachSignSearch of allSign) {
    if (eachSignSearch.value != '') {
      last4Signs.push(eachSignSearch.value);
      console.log(last4Signs);
    } else {
      alert('Error! Enter all signatures!');
    }
  }
};
const isEnteredElYazısı = () => {
  let checkedRadio;
  let parentCheckedRadio;
  for (radioBtn of radioButtonsG11) {
    if (radioBtn.checked) {
      checkedRadio = radioBtn;
      parentCheckedRadio = checkedRadio.parentElement;
      break;
    }
  }
  if (parentCheckedRadio) {
    elYazisi = parentCheckedRadio.textContent;
    console.log(elYazisi);
  } else {
    alert('El yazısı seçeneği seçilmelidir.');
  }
};
const getKisiGuvenlikBelgesi = () => {
  if (girismCheckbox.checked) {
    kisiGuvenlikBelgeGirisim = 'Girişimlere başlandı.';
  } else {
    kisiGuvenlikBelgeGirisim = 'Girişimlere başlanmadı.';
  }
  console.log(kisiGuvenlikBelgeGirisim);
};
const isEnteredEgitimVeKaynak = () => {
  let checkedRadio;
  let parentCheckedRadio;
  for (radioBtn of radioButtonsG12) {
    if (radioBtn.checked) {
      checkedRadio = radioBtn;
      parentCheckedRadio = checkedRadio.parentElement;
      break;
    }
  }
  if (parentCheckedRadio) {
    egitimKaynak = parentCheckedRadio.textContent;
    console.log(egitimKaynak);
  } else {
    alert('Eğitim ve Kaynak Yönetimi Grubu seçeneği seçilmelidir.');
  }
};
const isEnteredGrupEgitim = () => {
  let checkedRadio;
  let parentCheckedRadio;
  for (radioBtn of radioButtonsG13) {
    if (radioBtn.checked) {
      checkedRadio = radioBtn;
      parentCheckedRadio = checkedRadio.parentElement;
      break;
    }
  }
  if (parentCheckedRadio) {
    grupEgitim = parentCheckedRadio.textContent;
    console.log(grupEgitim);
  } else {
    alert('Grup/Birim Eğitimi seçeneği seçilmelidir.');
  }
};

const validationHandler = () => {
  isEnteredNameS();
  isEnteredIdNo();
  isEneteredSicilNo();
  isEnteredStartDate();
  isEnteredSignature();
  isEnteredBirim();
  isEnteredKadro();
  isEnteredSendika();
  //2nd table
  isEnteredGorevProje();
  isEnteredTelefonBaglanti();
  isEnteredUserName();
  isEnteredIcEposta();
  isEnteredDisEPosta();
  isEnteredYBS();
  isEnteredEBYS();
  //3rd table
  isEnteredVeriTabani();
  //4th table
  isEnteredGuvenlikBelgesi();
  //last 4 signs
  isEnteredSigns();
  //5th table
  isEnteredElYazısı();
  getKisiGuvenlikBelgesi();
  //last table
  isEnteredEgitimVeKaynak();
  isEnteredGrupEgitim();
  packageToArray();
  // isServerNotAvailable();
};

const deleteInputs = () => {
  for (each of contEditables) {
    each.textContent = '';
  }
  const allSearch = document.querySelectorAll('input[type=search]');
  for (each of allSearch) {
    each.value = '';
  }
  const allRadio = document.querySelectorAll('input[type=radio]');
  for (each of allRadio) {
    each.checked = false;
  }
};

const packageToArray = () => {
  let allInputs = [];
  allInputs.push(
    nameSurname,
    idNumber,
    sicilNum,
    startDateObject,
    grupBirim,
    userSign,
    kadroUnvan,
    sendikaKadro,
    gorevAlacagiProjeler,
    telefonBaglantıTalep,
    userName,
    icEposta,
    disEposta,
    ybsHesabi,
    ebysHesabi,
    veriTabani,
    guvenlikBelgesi,
    elYazisi,
    kisiGuvenlikBelgeGirisim,
    egitimKaynak,
    grupEgitim,
    last4Signs
  );
  (nameSurname = ''),
    (idNumber = ''),
    (sicilNum = ''),
    (startDateObject = ''),
    (grupBirim = ''),
    (userSign = ''),
    (kadroUnvan = ''),
    (sendikaKadro = ''),
    (gorevAlacagiProjeler = ''),
    (telefonBaglantıTalep = ''),
    (userName = ''),
    (icEposta = ''),
    (disEposta = ''),
    (ybsHesabi = ''),
    (ebysHesabi = ''),
    (veriTabani = ''),
    (guvenlikBelgesi = ''),
    (elYazisi = ''),
    (kisiGuvenlikBelgeGirisim = ''),
    (egitimKaynak = ''),
    (grupEgitim = ''),
    (last4Signs = []);
  const encryptedJson = JSON.stringify(allInputs);
  console.log(allInputs);
  // document.cookie="allInputs="+encryptedJson;
  
    // jQuery.post('http://localhost/checkinputs.php', 'encryptedJson=' + encryptedJson, getBack);
    jQuery.post('http://localhost/checkinputs.php', 'encryptedJson=' + encryptedJson).done(getBack).fail(handleError);
  }
  // catch($error){
  //   if(error.message.includes("POST http://localhost/checkinputs.php net::ERR_CONNECTION_REFUSED")){
  //     errorPopUpText.textContent="Error! Can't connect to the server!";
  //     popUp2.className = 'popup2';
  //     backDrop.className = 'backdrop'; 
  //   }
  // }
  function handleError() {
    errorPopUpText.textContent = "Error! Can't connect to the server!";
    popUp2.className = 'popup2';
    backDrop.className = 'backdrop'; 
  }


  

const getBack = (data, status) => {
  console.log('Data:' + data + '\nStatus:' + status);
  // serverResponseStatus=status;
  giveServerFeedBack(data,status);
};
const giveServerFeedBack = (data,status) => {
  if(status.includes("success")){
    if(data.includes("mysqli_sql_exception: No connection could be made")){
      errorPopUpText.textContent = "Error! Can't connect to the database.";
      popUp2.className = 'popup2';
      backDrop.className = 'backdrop'; 
    }
    else if(data.includes("Duplicate entry")){
      errorPopUpText.textContent = "Error! Duplicate entries detected under the T.C. kimlik numarası!";
      popUp2.className = 'popup2';
      backDrop.className = 'backdrop'; 
    }
    else if (data.includes('Error')||data.includes('error')) {
      errorPopUpText.textContent="Error! Entered values Can't be Submitted!";
      popUp2.className = 'popup2';
      backDrop.className = 'backdrop';
      
    } else {
      popUp.className = 'popup';
      backDrop.className = 'backdrop'; 
    }
  }
};
// const isServerNotAvailable=()=>{
//   if(serverResponseStatus=="Error"){
//     errorPopUpText.textContent="Error! Can't connect to the server!";
//     popUp2.className = 'popup2';
//     backDrop.className = 'backdrop';
//   }
// }


const togglePB1 = () => {
  popUp.className = 'popup invisible';
  backDrop.className = 'backdrop invisible';
};
const togglePB2 = () => {
  popUp2.className = 'popup2 invisible';
  backDrop.className = 'backdrop invisible';
};

applyBtn.addEventListener('click', validationHandler);
deleteButton.addEventListener('click', deleteInputs);
popUpButton.addEventListener('click', togglePB1);
backDrop.addEventListener("click",togglePB1);
popUpButton2.addEventListener("click",togglePB2);
backDrop.addEventListener("click",togglePB2);
