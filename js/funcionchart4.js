
/* Function to create the old profile chart refered into DISC report, chapter 1*/
/* var profile = 1 : Natural Profile*/
/* var profile = 2 : Adapted Profile*/
function createDChartCh1_old(determination,influence,serenity,conscientiousness,profile) {
    const ctx = document.getElementById('myChartBM').getContext('2d');
    const data = {
        labels: [determination,influence,serenity,conscientiousness],
        datasets: [{
          data: [determination,influence,serenity,conscientiousness],
          backgroundColor: ['#C81D16', '#ECC10A', '#7FAE30','#4188F3'],
          borderRadius: 25
        }]
      };
      const options = {
        indexAxis: 'y',
        scales: {
          x: {
            min: 0,
            max: 100,
            reverse: profile==1??false,
            position: 'top',
            grid: {
              drawBorder: false,
              lineWidth: 5
            },
            ticks: {
              stepSize: 50,
              font:{
                size: 18,
                style: 'normal',
                weight: 'bold',
              }
            }
          },
          y: {
            position: 'right',
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              font:{
                size: 18,
                family: "Arial",
                style: 'normal',
                weight: 'bold',
                lineHeight: 1.2
              }
            }
          },
        },
        plugins:{
          legend:{
            display: false
          }
        },
        animation: false,
      };
      
      const myChart = new Chart4(ctx, {
        type: 'bar',
        data: data,
        options: options,
      });
      var base64Img=myChart.toBase64Image();
      myChart.destroy();
      return base64Img;
}

/* Function to create profile chart refered into DISC report, chapter 1*/
function createDISCBarsChar_1(determination,influence,serenity,conscientiousness) {
  if(determination>100 || determination<0 ||
      influence>100 || influence<0 ||
      determination>100 || serenity<0 ||
      conscientiousness>100 || conscientiousness<0
  )
    return false;
  $("#content").append('<canvas id="myChartBM" style="width:100%;max-width:500px;display:none"></canvas>')
  const ctx = document.getElementById('myChartBM').getContext('2d');
  const data = {
    labels: ["","","",""],
    datasets: [{
      data: [determination,influence,serenity,conscientiousness],
      backgroundColor: ['#C81D16', '#ECC10A', '#7FAE30','#4188F3'],
      borderRadius: 25
    }]
  };
  const ch3LabelDesign = {
    id: 'ch3LabelDesign',
    beforeDraw(myChart,args,plugins){
      const { ctx, scales:{x,y} } = myChart;
      ctx.save();
      //Draw Legend Values
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText(determination,85,60);
      ctx.font = "20px Arial";
      ctx.fillText(influence,210,60);
      ctx.font = "20px Arial";
      ctx.fillText(serenity,325,60);
      ctx.font = "20px Arial";
      ctx.fillText(conscientiousness,440,60);
      //Draw Legend Letters
      ctx.font = "20px Arial";
      ctx.fillStyle = "#C81D16";
      ctx.fillText("D",85,610);
      ctx.font = "20px Arial";
      ctx.fillStyle = "#ECC10A";
      ctx.fillText("I",210,610);
      ctx.font = "20px Arial";
      ctx.fillStyle = "#7FAE30";
      ctx.fillText("S",325,610);
      ctx.font = "20px Arial";
      ctx.fillStyle = "#4188F3";
      ctx.fillText("C",440,610);
    }
  };
  const options = {
    scales: {
      x: {
        grid: {
          drawBorder: false,
          display: false
        },
        ticks: {
          font:{
            size: 18,
            style: 'normal',
            weight: 'bold',
          }
        }
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          drawBorder: false,
          lineWidth: 3
        },
        ticks: {
          stepSize: 50,
          font:{
            size: 18,
            family: "Arial",
            style: 'normal',
            weight: 'bold',
            lineHeight: 1.2
          }
        }
      },
    },
    plugins:{
      legend:{
        display: false,
      }
    },
    layout: {
      padding:{
        bottom:10,
        top:120
      }
    },
    animation: false,
  };
  const myChart = new Chart4(ctx, {
    type: 'bar',
    data: data,
    options: options,
    plugins: [ch3LabelDesign]
  });
  var base64Img=myChart.toBase64Image();
  myChart.destroy();
  $("#myChartBM").remove();
  return base64Img;
}

/* Function to create profile chart refered into DISC report, chapter 3*/
function createDISCBarsChart_3(determination,influence,serenity,conscientiousness) {
  if(determination>100 || determination<0 ||
      influence>100 || influence<0 ||
      determination>100 || serenity<0 ||
      conscientiousness>100 || conscientiousness<0
  )
    return false;
  $("#content").append('<canvas id="barDiscContainer" style="width:100%;max-width:500px;height:100%;max-height:627px;display:none"></canvas>')
  const ctx = document.getElementById('barDiscContainer').getContext('2d');
  const data = {
    labels: [determination,influence,serenity,conscientiousness],
    datasets: [{
      label: [],
      data: [determination,influence,serenity,conscientiousness],
      backgroundColor: ['#C81D16', '#ECC10A', '#7FAE30','#4188F3'],
      borderRadius: 25
    }]
  };
  const ch3LabelDesign = {
    id: 'ch3LabelDesign',
    beforeDraw(myChart,args,plugins){
      const { ctx, data, scales:{x,y} } = myChart;
      ctx.save();
      //Draw Legend Letters
      ctx.font = "40px Arial";
      ctx.fillText("D",85,45);
      ctx.font = "40px Arial";
      ctx.fillText("I",85+1*(125),45);
      ctx.font = "40px Arial";
      ctx.fillText("S",85+2*(114),45);
      ctx.font = "40px Arial";
      ctx.fillText("C",85+3*(114),45);
      
      //Draw Legend rectangles colors
      ctx.beginPath();
      ctx.fillStyle = "#C81D16";
      ctx.fillRect((62+0*(114)),55, 80, 5);
      ctx.beginPath();
      ctx.fillStyle = "#ECC10A";
      ctx.fillRect((62+1*(114)),55, 80, 5);
      ctx.beginPath();
      ctx.fillStyle = "#7FAE30";
      ctx.fillRect((62+2*(114)),55, 80, 5);
      ctx.beginPath();
      ctx.fillStyle = "#4188F3";
      ctx.fillRect((62+3*(114)),55, 80, 5);
      
      //Draw Scale Circles
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#C81D16';
      ctx.beginPath();
      ctx.roundRect((((x.right-y.width)/8)+26+0*(114)),585, 35, 35, [50]);
      ctx.stroke();
      ctx.strokeStyle = '#ECC10A';
      ctx.beginPath();
      ctx.roundRect((((x.right-y.width)/8)+(26+1*(114))),585, 35, 35, [50]);
      ctx.stroke();
      ctx.strokeStyle = '#7FAE30';
      ctx.beginPath();
      ctx.roundRect((((x.right-y.width)/8)+(26+2*(114))),585, 35, 35, [50]);
      ctx.stroke();
      ctx.strokeStyle = '#4188F3';
      ctx.beginPath();
      ctx.roundRect((((x.right-y.width)/8)+(26+3*(114))),585, 35, 35, [50]);
      ctx.stroke();
    }
  };
  const options = {
    scales: {
      x: {
        grid: {
          drawBorder: false,
          display: false
        },
        ticks: {
          stepSize: 50,
          font:{
            size: 18,
            style: 'normal',
            weight: 'bold',
          }
        }
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          drawBorder: false,
          lineWidth: 3
        },
        ticks: {
          font:{
            size: 18,
            family: "Arial",
            style: 'normal',
            weight: 'bold',
            lineHeight: 1.2
          }
        }
      },
    },
    plugins:{
      legend:{
        display: false,
      }
    },
    layout: {
      padding:{
        bottom:10,
        top:120
      }
    },
    animation: false,
  };
  const myChart = new Chart4(ctx, {
    type: 'bar',
    data: data,
    options: options,
    plugins: [ch3LabelDesign]
  });
  var base64Img=myChart.toBase64Image();
  myChart.destroy();
  $("#barDiscContainer").remove();
  return base64Img;
}

/* Function to create profile chart refered into DISC report, chapter 7-9*/
function createVerticalGradientChart(naturalPerc) {
  if (naturalPerc > 100 || naturalPerc < 0)
    return false;

  // Configuración del lienzo
    
  const canvasWidth = 300;
  const canvasHeight = 650;
  const rectWidth = 170;
  const rectHeight = 500;
  $("#content").append(`<canvas id="verticalGradientContainer" width="${canvasWidth}" height="${canvasHeight}" style="display:none"></canvas>`);
  const ctx = document.getElementById('verticalGradientContainer').getContext('2d');

  // Fondo blanco
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Gradiente
  const grd = ctx.createLinearGradient(5, 5, 5, rectHeight + 45);
  grd.addColorStop(0, "rgba(248, 120, 48, 1)");
  grd.addColorStop(1, "rgba(48, 174, 129, 1)");
  ctx.fillStyle = grd;

  // Posición del rectángulo
  const rectX = (canvasWidth - rectWidth) / 2; // Centro horizontal
  const rectY = 100; // Margen superior
  ctx.beginPath();
  ctx.roundRect(rectX, rectY, rectWidth, rectHeight, [10]);
  ctx.fill();

  // Líneas divisorias
  const step = rectHeight / 10.2; 
  for (let i = 0; i <= 10; i++) {
    const y = rectY + i * step; 
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgba(185, 185, 185, 1)";
    ctx.textAlign = "center";
    ctx.fillText("_", canvasWidth / 2, y);
  }

  // Indicador (triángulo)
  const signalPointY = rectY + (rectHeight - 10.2) - (rectHeight * naturalPerc) / 100;
  ctx.beginPath();
  ctx.moveTo(rectX - 10, signalPointY);
  ctx.lineTo(rectX, signalPointY + 10);
  ctx.lineTo(rectX - 10, signalPointY + 20);
  ctx.lineTo(rectX - 10, signalPointY);
  ctx.fillStyle = 'black';
  ctx.fill();

  // Texto en la parte superior (centrado)
  const textX = canvasWidth / 2;
  const text_String_Y = 35;
  const text_Number_Y = 75;
  ctx.textAlign = "center";
  ctx.font = "bolder 30px Arial";
  ctx.fillStyle = "black";

  if (naturalPerc < 25) {
    ctx.fillText("Bajo ", textX, text_String_Y);
    ctx.fillText(naturalPerc, textX, text_Number_Y);
  } else if (naturalPerc < 50) {
    ctx.fillText("Medio Bajo ", textX, text_String_Y);
    ctx.fillText(naturalPerc, textX, text_Number_Y);
  } else if (naturalPerc < 75) {
    ctx.fillText("Medio Alto ", textX, text_String_Y);
    ctx.fillText(naturalPerc, textX, text_Number_Y);
  } else {
    ctx.fillText("Alto", textX, text_String_Y);
    ctx.fillText(naturalPerc, textX, text_Number_Y);
  }

  // Convertir a Base64
  const base64 = document.getElementById("verticalGradientContainer").toDataURL("image/jpeg").split(';base64,')[1];
  $("#verticalGradientContainer").remove();
  return base64;
}

function createVerticalGradientChart_old(naturalPerc){
  if(naturalPerc>100 || naturalPerc<0)
    return false;
  $("#content").append('<canvas id="verticalGradientContainer" width="200" height="430" style="display:none"></canvas>');
  const ctx = document.getElementById('verticalGradientContainer').getContext('2d');
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,200,500);
  const grd = ctx.createLinearGradient(5,5,5,400);
  grd.addColorStop(0, "rgba(248, 120, 48, 1)");
  grd.addColorStop(1, "rgba(48,174,129,1)");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.roundRect(25, 25, 25, 380,[50]);
  ctx.fill();
  for(let i=0;i<=10;i++){
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgba(185, 185, 185, 1)";
    ctx.textAlign = "center";
    ctx.fillText("_",60,35*i+38);
  }
  var signalPointY = 382 - (3.5*naturalPerc);
  ctx.beginPath();
  ctx.moveTo(75,signalPointY);
  ctx.lineTo(85,signalPointY+10);
  ctx.lineTo(75,signalPointY+20);
  ctx.lineTo(75,signalPointY);
  ctx.fillStyle = 'black';
  ctx.fill();

  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  if(naturalPerc<25)
    ctx.fillText("Bajo "+naturalPerc,130,400-(3.5*naturalPerc));
  else if(naturalPerc<50){
    ctx.fillText("Medio",125,400-(3.5*naturalPerc));
    ctx.fillText("Bajo "+naturalPerc,130,425-(3.5*naturalPerc));
  }
  else if(naturalPerc<75){
    ctx.fillText("Medio",125,400-(3.5*naturalPerc));
    ctx.fillText("Alto "+naturalPerc,130,425-(3.5*naturalPerc));
  }
  else
    ctx.fillText("Alto "+naturalPerc,130,400-(3.5*naturalPerc));
  const base64 = document.getElementById("verticalGradientContainer").toDataURL("image/jpeg").split(';base64,')[1];
  $("#verticalGradientContainer").remove();
  return base64;
}

/* Function to create profile chart refered into DISC report, chapter 8*/
function createHorizontalRulerChart(naturalPerc){
  if(naturalPerc>100 || naturalPerc<0)
    return false;
  $("#content").append('<canvas id="horizRulerContainer" width="900" height="40" style="display:none"></canvas>')
  const ctx = document.getElementById('horizRulerContainer').getContext('2d');
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,900,40);
  ctx.fillStyle = "#F0F0F0";
  ctx.beginPath();
  ctx.roundRect(5, 5, 890, 30,[8]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "#7197FB";
  ctx.roundRect(5, 5,(naturalPerc*8.4+20), 30,[8]);
  ctx.fill();
  for(let i=0;i<=10;i++){
    ctx.font = "bold 15px Arial";
    ctx.fillStyle = (10*i)<naturalPerc?"white":"black";
    ctx.textAlign = "center";
    ctx.fillText(10*i,84*i+25,25);
    ctx.font = "bold 8px Arial";
    ctx.fillText("|",84*i+25,33);
  }
  const base64 = document.getElementById("horizRulerContainer").toDataURL("image/jpeg").split(';base64,')[1];
  $("#horizRulerContainer").remove();
  return base64;
}

/* Function to create profile chart refered into DISC report, chapter 3*/
/* Type = 1 =>'time' (minutos)*/  
/* Type = 2 =>'Percentage' (%)*/  
function createHorizontalSlidingChart(value,type){
  $("#content").append('<canvas id="horizSlidingContainer" width="410" height="60" style="display:none"></canvas>')
  $('#horizSlidingContainer').css({
    "background-color":"transparent" 
  })
  const ctx = document.getElementById('horizSlidingContainer').getContext('2d');
  switch (type){
    case 1:
      if(value<0)
        return false;
      linePosition = value<=60 ? (5.3*value)+25 : 345;
      boxPosition = value<=60 ? (5.3*value)+10 : 330;
      labelPosition = value<=60 ? (5.3*value)+8 : 325;
      labelText = value+" minutos";
      break;
    case 2:
      if(value>100 || value<0)
        return false;
      linePosition = (3.2*value)+25;
      boxPosition = (3.2*value)+10;
      labelPosition = (3.2*value)+20;
      labelText = value+"%";
      break;
    default:
      return false;
  }
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,410,60);
  ctx.fillStyle = "#C1DAFF";
  ctx.beginPath();
  ctx.roundRect(5, 5, 390, 20,[50]);
  ctx.fill();
  ctx.beginPath(); 
  ctx.moveTo(linePosition,2);
  ctx.lineTo(linePosition,28);
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.fillStyle = "rgba(65, 136, 243,0.9)";
  ctx.beginPath();
  ctx.roundRect(boxPosition, 5, 60, 20,[5]);
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";
  ctx.fillText(labelText,labelPosition,47);
  const base64 = document.getElementById("horizSlidingContainer").toDataURL("image/jpeg").split(';base64,')[1];
  $("#horizSlidingContainer").remove();
  return base64;
}

/* Function to create DISC Wheel chart refered into DISC report, chapter 4*/
async function createDiscWheelChart(naturalProfile=false,adaptedProfile=false){
  const profile={
    'IS':0,'Is':1,'I':2,'Id':3,'DI':4,'Di':5,'D':6,'Dc':7,'CD':8,'Cd':9,'C':10,'Cs':11,'SC':12,'Sc':13,'S':14,'Si':15,
    'Ds':{'pointX':390,'pointY':380,'starX':400,'starY':390},
    'Ic':{'pointX':425,'pointY':380,'starX':435,'starY':390},
    'Sd':{'pointX':422,'pointY':434,'starX':432,'starY':444},
    'Ci':{'pointX':388,'pointY':435,'starX':398,'starY':445}
  };
  if (naturalProfile && (naturalProfile in profile)) {
    var pointX,starX,pointY,starY,rP=122,rS=115,pointStroke=false,starStroke=false;
    if(Number.isInteger(profile[naturalProfile])){
      pointX=404+(rP*Math.cos(profile[naturalProfile]*0.396));
      pointY=405-(rP*Math.sin(profile[naturalProfile]*0.396));
    } else {
      pointX=profile[naturalProfile]['pointX'];
      pointY=profile[naturalProfile]['pointY'];
      pointStroke=true;
    }
    if(adaptedProfile && (adaptedProfile in profile)){
      if(Number.isInteger(profile[adaptedProfile])){
        starX= naturalProfile===adaptedProfile
                ? 410+((100-20)*Math.cos(profile[adaptedProfile]*0.396))
                : 410+(rS*Math.cos(profile[adaptedProfile]*0.396));
        starY= naturalProfile===adaptedProfile
                ? 415-((100-20)*Math.sin(profile[adaptedProfile]*0.396))
                : 415-(rS*Math.sin(profile[adaptedProfile]*0.396));
      } else {
        starX=profile[adaptedProfile]['starX'];
        starY=profile[adaptedProfile]['starY'];
        starStroke=true;
      }
    }
    $("#content").append('<canvas id="discWheelContainer" width="830" height="840" style="display:none"></canvas>')
    const ctx = document.getElementById('discWheelContainer').getContext('2d');
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,830,840);
    const img = new Image();
    img.src = "../images/DISCWheel.png";
    await img.decode();
    ctx.drawImage(img,0,0);
    drawPoint(pointX,pointY,ctx,pointStroke,1);
    if(adaptedProfile && (adaptedProfile in profile))
      drawStar(starX,starY,5,14,7,ctx,starStroke,1);
    const base64 = document.getElementById("discWheelContainer").toDataURL("image/jpeg").split(';base64,')[1];
    $("#discWheelContainer").remove();
    return base64;
  } else 
    return false;
}

async function createDiscWheelChart_2(naturalProfile=false,adaptedProfile=false){
  if (naturalProfile && naturalProfile>=1 && naturalProfile<=60 && Number.isInteger(naturalProfile)) {
    const starStroke = naturalProfile==adaptedProfile?true:false;
    var pointCenter = {x:403,y:404};
    var starCenter = {x:413,y:415};
    $("#content").append('<canvas id="discWheelContainer" width="830" height="840" style="display:none"></canvas>')
    const ctx = document.getElementById('discWheelContainer').getContext('2d');
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,830,840);
    const img = new Image();
    img.src = "../images/DISCWheel2.png";
    await img.decode();
    ctx.drawImage(img,0,0);
    var point = computeCoor(naturalProfile,pointCenter);
    drawPoint(point.x,point.y,ctx,false,point.size);
    if (adaptedProfile && adaptedProfile>=1 && adaptedProfile<=60 && Number.isInteger(adaptedProfile)){
      var star = computeCoor(adaptedProfile,starCenter);
      drawStar(star.x,star.y,5,14,7,ctx,starStroke,star.size);
    }
    const base64 = document.getElementById("discWheelContainer").toDataURL("image/jpeg").split(';base64,')[1];
    $("#discWheelContainer").remove();
    return base64;
  } else 
    return false;
}

const computeCoor = (profile,centerRef) => {
  var r,ringStartValue, rate,correctionAngle=0,sizeFactor=1;
  if(profile<9){
    r = 235;
    ringStartValue = 1;
    rate = Math.PI/4;
    correctionAngle = 3*Math.PI/16;
  } else if(profile>=9 && profile<=24){
    r = 190;
    ringStartValue = 9;
    rate = Math.PI/8;
  } else if(profile>=25 && profile<=40){
    r = 140;
    ringStartValue = 25;
    rate = Math.PI/8;
  } else if(profile>=41 && profile<=56){
    r = 85;
    ringStartValue = 41;
    rate = Math.PI/8;
    sizeFactor = 0.75;
  } else if(profile>=57 && profile<=60){
    r = 35;
    ringStartValue = 57;
    rate = Math.PI/2;
    correctionAngle = 3*Math.PI/16;
    sizeFactor = 0.75;
  }
  var element = {
    x:centerRef.x+(r*Math.cos((7*Math.PI/16)-((profile-ringStartValue)*rate)-correctionAngle)),
    y:centerRef.y-(r*Math.sin((7*Math.PI/16)-((profile-ringStartValue)*rate)-correctionAngle)),
    size:sizeFactor
  }
  return element;
}

function drawStar(cx, cy, spikes, outerRadius, innerRadius,ctx,starStroke,pointSizeFactor) {
  var rot = Math.PI / 2 * 3;
  var x = cx;
  var y = cy;
  var step = Math.PI / spikes;
  outerRadius = outerRadius*pointSizeFactor;
  innerRadius = innerRadius*pointSizeFactor;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius)
  for (i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y)
      rot += step
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y)
      rot += step
  }
  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath();
  if(starStroke){
    ctx.strokeStyle = '#D88304';
    ctx.lineWidth = 3;
    ctx.stroke();
  } else {
    ctx.fillStyle='#D88304';
    ctx.fill();
  }
}

function drawPoint(pointX,pointY,ctx,pointStroke,pointSizeFactor){
  const centerPosCorr = pointSizeFactor!=1 ? 3 : 0;
  if(pointStroke){
    ctx.strokeStyle = '#0082CB';
    ctx.lineWidth = 3;
    ctx.roundRect(pointX+centerPosCorr,pointY+centerPosCorr, 20*pointSizeFactor, 20*pointSizeFactor, [50]);
    ctx.stroke();
  } else {
    ctx.fillStyle = '#0082CB';
    ctx.roundRect(pointX+centerPosCorr,pointY+centerPosCorr, 20*pointSizeFactor, 20*pointSizeFactor, [50]);
    ctx.fill();
  }
}

/* Function to create the DISC Radar chart refered into DISC report, chapter 4*/
/* var naturalProfile = Array() : Natural Profile=[determination,influence,serenity,conscientiousness]*/
/* var adaptedProfile = Array() : Adapted Profile=[determination,influence,serenity,conscientiousness]*/

async function createRadarChart(naturalProfile, adaptedProfile){
  $("#content").append('<canvas id="radarContainer" style="width:100%;max-width:1200px;height:100%;max-height:980px" style="display:none"></canvas>');
  const img = new Image();
  img.src = "../images/discColorRing.png";
  let m = 39/100;
  await img.decode();
  const ctx = document.getElementById('radarContainer').getContext('2d');
  const data = {
    labels: ['','','',''],
    datasets: [{
      data: [m*adaptedProfile[0],m*adaptedProfile[1],m*adaptedProfile[2],m*adaptedProfile[3]],
      fill: true,
      backgroundColor: 'rgba(108,201,253,0.3)',
      borderWidth:0,
      radius: 4,
      pointBackgroundColor: 'rgba(108,185,253,1)',
    }, {
      data: [m*naturalProfile[0],m*naturalProfile[1],m*naturalProfile[2],m*naturalProfile[3]],
      fill: true,
      backgroundColor: 'rgba(235,206,206,0.6)',
      borderWidth:0,
      radius: 4,
      pointBackgroundColor: 'rgba(201,51,53,1)',
    }]
  };
  const chartDesign = {
    id: 'chartDesign',
    beforeDraw(myChart){
      const {ctx, chartArea: {left, top, width, height}} = myChart;
      ctx.fillStyle = 'white'
      ctx.fillRect(0,0,1200,980)
      ctx.drawImage(img,0,0);
    }
  };
  const options = {
    animation: false,
    scales: {
      r: {
        angleLines: {display: false},
        grid:{display:false},
        ticks:{display:false},
        min:0,
        max:100
      }
    },
    plugins:{
      legend:{
        display: false,
      }
    },
    layout: {
      padding: {
        left: 52,
        bottom: 68
      }
    }
  };
  const myChart = new Chart4(ctx, {
    type: 'radar',
    data: data,
    options: options,
    plugins: [chartDesign]
  });
  var base64Img=myChart.toBase64Image('image/jpeg');
  myChart.destroy();
  $("#radarContainer").remove();
  return base64Img;
}

/* Function to create DISC Arc chart refered into DISC report, chapter 1*/
/* var profile = 1 : Natural Profile*/
/* var profile = 2 : Adapted Profile*/
function createDiscArcChart(determination,influence,serenity,conscientiousness,profile){
  if(determination>100 || determination<0 ||
    influence>100 || influence<0 ||
    determination>100 || serenity<0 ||
    conscientiousness>100 || conscientiousness<0
  )
    return false;
  if(parseInt(profile)!=2 && parseInt(profile)!=1)
    return false;

  $("#content").append('<canvas id="discArcContainer" width="500" height="600" style="display:none"></canvas>')
  const ctx = document.getElementById('discArcContainer').getContext('2d');
  var discColors = ['#F3545C', '#F8D249','#65B63F','#4188F3'];
  var discValues = [determination,influence,serenity,conscientiousness];
  var discLetters = ['D','I','S','C'];
  ctx.font = "15px Arial";
  ctx.fillStyle = "rgba(207, 215, 224, 1)";
  ctx.textAlign = "center";
  ctx.fillText('50%',250,40);
  ctx.fillText('0%',250,380);
  ctx.font = "25px Arial";
  ctx.fillStyle = "rgba(47, 76, 119, 1)";
  ctx.textAlign = "center";
  ctx.fillText('Perfil',250,190);
  ctx.font = "bold 25px Arial";
  ctx.fillText(profile==1?'Natural':'Adaptado',250,220);
  ctx.strokeStyle = 'rgba(207, 213, 224, 1)';
  ctx.beginPath();
  ctx.moveTo(250, 50);
  ctx.lineTo(250, 130);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(250, 265);
  ctx.lineTo(250, 360);
  ctx.stroke();
  discValues.forEach((elm,idx)=>{
    createArc(elm,discColors[idx],70+(25*idx),ctx);
  }); 
  ctx.lineWidth = 6;
  discValues.forEach((elm,idx)=>{
    createArcLegend(elm,discColors[idx],idx,discLetters[idx],ctx);
  });
  const base64 = document.getElementById("discArcContainer").toDataURL("image/png").split(';base64,')[1];
  $("#discArcContainer").remove();
  return base64;
}

function createArc(percentage,color,radius,ctx){
  if(percentage==100)
    percentage=99.9;
  ctx.beginPath();
  ctx.arc(250, 200, radius, (Math.PI)/2,(125-99.9)*(Math.PI/50),true);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(47, 76, 119, 0.2)';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(250, 200, radius, (Math.PI)/2,(125-percentage)*(Math.PI/50),true);
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.stroke();
}

function createArcLegend(percentage,color,idx,letter,ctx){
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.roundRect((90+100*idx),430, 15, 15, [50]);
  ctx.stroke();
  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "#2F4C77";
  ctx.textAlign = "center";
  ctx.fillText(letter,(97+100*idx),500);
  ctx.font = "25px Arial";
  ctx.textAlign = "center";
  ctx.fillText(percentage,(97+100*idx),550);
  
}
