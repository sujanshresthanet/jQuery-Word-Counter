"use strict";

// define element variables
var input = jQuery('#text-input'),
    characterCount = jQuery('#characterCount'),
    wordCount = jQuery('#wordCount'),
    sentenceCount = jQuery('#sentenceCount'),
    paragraphCount = jQuery('#paragraphCount'),
    readingTime = jQuery('#readingTime'),
    keywordsDiv = jQuery('.keywords'),
    topKeywords = jQuery('#topKeywords');

// trigger keyup and change event
input.on("keyup change", function(e) {
    // count the charater length
    characterCount.html(jQuery(this).val().length);
    var words = jQuery(this).val().match(/\b[-?(\w+)?]+\b/gi);

    // check if word count is not empty
    if (words) {
        wordCount.html(words.length);
    } else {
        wordCount.html(0);
    }

    // check if word count is not empty
    if (words) {
        var sentences = jQuery(this).val().split(/[.|!|?]+/g);
        sentenceCount.html(sentences.length - 1);
    } else {
        sentenceCount.html(0);
    }

    // check if word count is not empty
    if (words) {
        var paragraphs = jQuery(this).val().replace(/\n$/gm, '').split(/\n/);
        paragraphCount.html(paragraphs.length);
    } else {
        paragraphCount.html(0);
    }

    // check if word count is not empty
    if (words) {
        var allKeywords = [];
        for (var i = 0; i < words.length; i++) {
            allKeywords.push(words[i].toLowerCase());
        }
        var keywords = {};
        for (var i = 0; i < allKeywords.length; i++) {
            if (allKeywords[i] in keywords) {
                keywords[allKeywords[i]] += 1;
            } else {
                keywords[allKeywords[i]] = 1;
            }
        }
        var sortedKeywords = [];
        for (var keyword in keywords) {
            sortedKeywords.push([keyword, keywords[keyword]])
        }
        sortedKeywords.sort(function(a, b) {
            return b[1] - a[1]
        });
        topKeywords.html('');
        for (var i = 0; i < sortedKeywords.length && i < words.length; i++) {
            var li = document.createElement("div");
            li.className = "col";
            li.innerHTML = sortedKeywords[i][0] + ": " + sortedKeywords[i][1];
            topKeywords.append(li);
        }
    }

    // check if word count is not empty
    if (words) {
        keywordsDiv.show();
    } else {
        keywordsDiv.hide();
    }
});

// Clear the text input
function eraseText() {
    document.getElementById("text-input").value = "";
}