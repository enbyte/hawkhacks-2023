// // Copyright (C) 2023 Sunny Crowder-Sklar and Ethan Uppal. All rights reserved.

function id(x) { return document.getElementById(x); }
function classes(x) { return document.getElementsByClassName(x); }

function main(chrome) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = tabs[0].url;
        const domain = domainFromUrl(url);
        try {
            const [ credibility, bias ] = MediaBias.lookup(domain);
            displayInfo(domain, credibility, bias);
        } catch (error) {
            id('error-time-span').textContent = (new Date()).toString();
            id('error-span').textContent = error;
            id('error-ctx-span').textContent = JSON.stringify({
                domain: domain
            });
            id("error").style.display = 'block';
            for (const content of classes("content")) {
                content.style.display = 'none';
                content.style.visibility = 'hidden';
            }
        }
    });
}

// Stolen from stack
function domainFromUrl(url) {
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result
}

function displayInfo(domain, credibility, bias) {
    const graphCanvas = id('graph');
    const domainSpan = id('domain-span');
    const credibilitySpan = id('credibility-span');
    const biasSpan = id('bias-span');

    domainSpan.textContent = domain;
    credibilitySpan.textContent = credibility;
    biasSpan.textContent = bias;

    showDomainOnGraph(graphCanvas, domain, credibility, bias);
}

function showDomainOnGraph(canvas, domain, credibility, bias) {
    var offset_x = 50;
    var offset_y = 50;
    var ctx = canvas.getContext('2d');

    // draw current
    if (bias > 0) {
        ctx.fillStyle = 'red';
    } else {
        ctx.fillStyle = 'blue';
    }

    ctx.beginPath();

    var x_coord = 200 * ((parseInt(bias) + 32) / 59);
    var y_coord = 200 - (200 * ((credibility - 2) / (60)));
    alert(bias + " " + x_coord + " " +  y_coord)
    ctx.arc(offset_x + x_coord, offset_y + y_coord, 5, 0, 2 * Math.PI);
    ctx.font = "'Courier New' Courier monospace 10px";
    ctx.fillText(domain, offset_x + x_coord, offset_y + y_coord + 20);
    ctx.fill();
}

// Make it compatible with the simulator
// Falls back to just calling main directly if in chrome
ChromeExtensionSimulator.run(main);
