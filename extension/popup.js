// // Copyright (C) 2023 Sunny Crowder-Sklar and Ethan Uppal. All rights reserved.

function id(x) { return document.getElementById(x); }
function classes(x) { return document.getElementsByClassName(x); }


// Stolen from stack
function setCurrentPageUrl(newUrl) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { url: newUrl });
      }
    });
  }


function main(chrome) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = tabs[0].url;
        const domain = domainFromUrl(url);
        try {
            const [ credibility, bias, name ] = MediaBias.lookup(domain);
            displayInfo(name, domain, credibility, bias);
        } catch (error) {
            id('error-time-span').textContent = (new Date()).toString();
            id('error-span').textContent = error;
            id('error-ctx-span').textContent = JSON.stringify({
                domain: domain
            });
            id("error").style.display = 'block';
            for (const content of classes("content")) {
                content.style.display = 'none';
            }
        }
    });
}

// Stolen from stack
function domainFromUrl(url) {
    var result;
    var match;
    if ((match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im))) {
        result = match[1];
        if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
            result = match[1];
        }
    }
    return result;
}

function fakeRedirect() {
    alert("Located Keywords - Found article on site CNN.com about 'Debt limit', 'Biden', and 'McCarthy'\nRedirecting...");
    setCurrentPageUrl('https://www.cnn.com/2023/05/21/politics/debt-ceiling-talks-biden-mccarthy/index.html');
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("take-me-there").addEventListener("click", fakeRedirect);
  });



function displayInfo(name, domain, credibility, bias) {
    const graphCanvas = id('graph');
    const nameSpan = id('name-span');
    const domainSpan = id('domain-span');
    const credibilitySpan = id('credibility-span');
    const biasSpan = id('bias-span');

    nameSpan.textContent = name;
    domainSpan.textContent = domain;
    credibilitySpan.textContent = credibility;
    biasSpan.textContent = bias;
    id("bias-side-span").textContent = ((Math.abs(bias) <= 5 && bias != 0) ? 'slightly ' : '') + (
        (bias > 0) ? 'right-' : (
            (bias < 0) ? 'left-' : 'un'
        )
    );

    showSourceOnGraph(graphCanvas, name, credibility, bias);

    id("error").style.display = 'none';
    for (const content of classes("content")) {
        content.style.display = null;
    }
}

function showSourceOnGraph(canvas, name, credibility, bias) {
    const drawingSize = 250;

    var offset_x = (canvas.width - drawingSize) / 2;
    var offset_y = (canvas.height - drawingSize) / 2;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var x_coord = drawingSize * ((parseInt(bias) + 32) / 59);
    var y_coord = drawingSize - (drawingSize * (credibility / (64)));

    ctx.fillStyle = '#004000';
    ctx.fillRect(offset_x, offset_y, drawingSize, drawingSize * 24 / 64);
    ctx.fill();
    ctx.fillStyle = '#404000';
    ctx.fillRect(offset_x, offset_y + drawingSize * 24 / 64, drawingSize, drawingSize * 16 / 64);
    ctx.fill();
    ctx.fillStyle = '#604000';
    ctx.fillRect(offset_x, offset_y + drawingSize * 40 / 64, drawingSize, drawingSize * 24 / 64);
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    for (var i = 0; i < 9; i++) {
        const slide = i / 8 * drawingSize;
        ctx.moveTo(offset_x + slide, offset_y);
        ctx.lineTo(offset_x + slide, offset_y + drawingSize);
        ctx.moveTo(offset_x, offset_y + slide);
        ctx.lineTo(offset_x + drawingSize, offset_y + slide);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(offset_x + x_coord, offset_y + y_coord, 5, 0, 2 * Math.PI);
    if (bias > 0) {
        ctx.fillStyle = 'red';
    } else if (bias < 0) {
        ctx.fillStyle = '#80FFFF';
    } else {
        ctx.fillStyle = 'white';
    }
    ctx.strokeStyle = null;
    ctx.fill();

    ctx.font = "bold 20px Arial";
    ctx.textAlign = 'center';
    var text = ctx.measureText(name);
    var textOverflow = offset_x + x_coord + text.width - canvas.width - 8;
    if (textOverflow > 0) {
        x_coord -= textOverflow;
    }
    ctx.fillText(name, offset_x + x_coord, offset_y + y_coord + 20);

    ctx.font = "18px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText("Bias", offset_x + drawingSize / 2, offset_y + drawingSize + 18);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Credibility", -offset_x - drawingSize / 2, 18);
}

// Make it compatible with the simulator
// Falls back to just calling main directly if in chrome
main(chrome);
