Parse.initialize("S4KPo6rwBwk16fNnreLk1Px3vST6jRmDk6k9fs5R", "bXvGBcQE0WpWl8FaNLwgI0zv6iOkT6b0D3b3DlQq");

var usernameField = document.getElementById("usernameField");
var passwordField = document.getElementById("passwordField");
var loginButton   = document.getElementById("loginButton");
var signupButton  = document.getElementById("signupButton");
var logoutButton  = document.getElementById("logoutButton");
var loginBlock    = document.getElementById('login');
var logoutBlock   = document.getElementById('logout');
var sectionTitlesBlock = document.getElementById('sectionTitles');

var welcomeBlock  = document.getElementById('welcomeMessage');
var welcomeText   = document.getElementById('message');

var bookmarkedJournals = document.getElementById('bookmarkedJournals');
var myJournalsDiv = document.getElementById('myJournalsDiv');
var newJournalButton = document.getElementById('newJournalButton');

var bookmarkedEntries = document.getElementById('bookmarkedEntries');
var myEntriesDiv = document.getElementById('myEntriesDiv');
var newEntryButton = document.getElementById('newEntryButton');

var newEntryDiv = document.getElementById('newEntryDiv');
var entryDataButton = document.getElementById('entryDataButton');

loginButton.addEventListener('click', loginHandler);
signupButton.addEventListener('click', signupHandler);
logoutButton.addEventListener('click', logoutHandler);

var JournalData = Parse.Object.extend("Journals");
var EntriesData = Parse.Object.extend("Entries");

var currentJournal;
var currentEntry;
var currentNumEntries;
var currentJournalIndex = 0;
var currentEntryIndex = 0;


// Handles the logging in
function loginHandler(){
	user.set("username", usernameField.value);
	user.set("password", passwordField.value);
	user.logIn({
		success:function (user){
			console.log("login worked");
			currentUser = Parse.User.current();
			loggedIn();
		}, 
		error: function (user, error){
			console.log("error "+ error.code);
		}
	});
}

// Handles the signing up
function signupHandler(){
	user.set("username", usernameField.value);
	user.set("password", passwordField.value);
	user.signUp(null, {
		success:function (user){
			console.log("signup worked");
			currentUser = Parse.User.current();
			loggedIn();
		}, 
		error: function (user, error){
			console.log("error "+ error.code);
		}
	});
}

// Handles the logging out
function logoutHandler(){
	Parse.User.logOut();
	currentUser = Parse.User.current();  // this will now be null
	loggedOutView();

	myJournalsDiv.innerHTML = "";
	newJournalButton.innerHTML = "";
	newEntryDiv.innerHTML = "";
	entryDataButton.innerHTML = "";
	myEntriesDiv.innerHTML = "";
	newEntryButton.innerHTML = "";
}

// Code to run once the user has logged in or signed up
function loggedIn(){
	loggedInView();

	var journalsRelation = user.relation("userJournals");
	var queryOfRelation = journalsRelation.query();
	queryOfRelation.descending("entryStartDate");
	queryOfRelation.find({
		success: function (results){
			for (var i=0; i<results.length; i++){
				var journalData = results[i];
				var journal = new Journal (journalData, currentEntry, i);
			}
			buildNewJournalButton();
		},
		error:function(error){
			alert("Something went wrong: error is " + error.message);
		}
	});
}

// Once logged in, hide the login fields and display message
function loggedInView(){
	loginBlock.classList.remove("shown");
	loginBlock.classList.add("hidden");
	welcomeMessage.classList.remove("hidden");
	welcomeMessage.classList.add("shown");
	welcomeText.textContent = "Welcome " + user.get("username");
	logoutBlock.classList.remove("hidden");
	logoutBlock.classList.add("shown");
	sectionTitlesBlock.classList.remove("hidden");
	sectionTitlesBlock.classList.add("shown");
}

// When not logged in, show the login fields
function loggedOutView(){
	loginBlock.classList.remove("hidden");
	loginBlock.classList.add("shown");
	welcomeMessage.classList.remove("shown");
	welcomeMessage.classList.add("hidden");
	logoutBlock.classList.remove("shown");
	logoutBlock.classList.add("hidden");
	sectionTitlesBlock.classList.remove("shown");
	sectionTitlesBlock.classList.add("hidden");
}

// Create the "Add Journal" button
function buildNewJournalButton(){
	var button = document.createElement("button");
	button.className = "addJournal btn btn-default";
	var buttonLabel = document.createTextNode("Add Journal");
	button.appendChild(buttonLabel);

	button.addEventListener('click', function(event){	
		var journalData = new JournalData ();
		var journalsRelation = user.relation("userJournals");
		var newJournalTitle = prompt("Enter the new journal's title.");
		currentJournalIndex = 0;
		currentEntryIndex = 0;

		journalData.save({
			journalTitle: newJournalTitle,
		}, 
		{
			success: function(results){
				console.log("Created new journal");
				journalsRelation.add(journalData);
				user.save(null, {
					success: function (results){
						refreshJournalsSection();
					},
					error:function(error){
						alert("Something went wrong: error is " + error.message);
					}
				});
			},
			error: function(error){
				console.log("Error creating new journal. Error: " + error);
			}
		});

	});
	newJournalButton.appendChild(button);
}

// Create the "Add Entry" button
function buildNewEntryButton(journalSelf, entrySelf){
	var button = document.createElement("button");
	button.className = "addEntry btn btn-default";
	var buttonLabel = document.createTextNode("Add Entry");
	button.appendChild(buttonLabel);
	var isDefaultTitle = true;
	var titleValue = "Entry#";

	button.addEventListener('click', function(event){	
		buildNewEntry(journalSelf, entrySelf, isDefaultTitle, titleValue);
	});
	newEntryButton.appendChild(button);
}

// Build a new entry
function buildNewEntry(journalSelf, entrySelf, isDefaultTitle, titleValue){
	var entriesData = new EntriesData ();
	var entriesRelation = currentJournal.data.relation("userEntries");

	// Initial Values
	if(isDefaultTitle) {
		parseInt(currentNumEntries, 10);
		currentNumEntries++;
		var newEntryTitle = "Entry" + currentNumEntries;
	} else {
		var newEntryTitle = titleValue;
	}
	var initialEntryTitle = newEntryTitle.toString();
	var ititialEntryText = "";
	var newEntryStartDate = moment().format("YYYY-MM-DDTHH:mmZ");
	var initialEntryStartDate = new Date(newEntryStartDate);
	var newEntryEndDate = moment().format("YYYY-MM-DDTHH:mmZ");
	var initialEntryEndDate = new Date(newEntryEndDate);
	var initialEntryImportance = parseInt(3, 10);
	var initialEntryCategory = ("None").toString();
	console.log(initialEntryTitle, ititialEntryText, initialEntryStartDate, initialEntryEndDate, initialEntryImportance, initialEntryCategory);

	entriesData.save({
		entryTitle: initialEntryTitle,
		entryText: ititialEntryText,
		entryStartDate: initialEntryStartDate,
		entryEndDate: initialEntryEndDate,
		entryImportance: initialEntryImportance,
		entryCategory: initialEntryCategory
	}, 
	{
		success: function(results){
			console.log("Created new entry");
			if(isDefaultTitle) {
				var n = noty({text: 'Added new entry!'});
			} else {
				var n = noty({text: 'Continued entry!'});
			}
			entriesRelation.add(entriesData);
			currentEntry = entrySelf;
			currentEntryIndex = 0;
			currentJournal.data.save(null, {
				success: function (results){
					refreshEntriesSection(journalSelf, entrySelf);
				},
				error:function(error){
					alert("Something went wrong: error is " + error.message);
				}
			});
		},
		error: function(error){
			console.log("Error creating new entry. Error: " + error);
		}
	});
}

// After a journal has been created, delete and recreate the journal list
function refreshJournalsSection(){
	console.log("refreshJournalSection function called")

	var journalsRelation = user.relation("userJournals");
	var queryOfRelation = journalsRelation.query();
	queryOfRelation.descending("entryStartDate");
	queryOfRelation.find({
		success: function (results){
			myJournalsDiv.innerHTML = "";
			newJournalButton.innerHTML = "";
			newEntryDiv.innerHTML = "";
			entryDataButton.innerHTML = "";
			loggedIn();
		},
		error:function(error){
			alert("Something went wrong: error is " + error.message);
		}
	});
}

// After an entry has been created or updated, delete and recreate the entry list
function refreshEntriesSection(journalSelf, entrySelf){
	console.log("refreshEntrySection function called")
	myEntriesDiv.innerHTML = "";
	newEntryButton.innerHTML = "";
	newEntryDiv.innerHTML = "";
	entryDataButton.innerHTML = "";

	var entriesRelation = journalSelf.data.relation("userEntries");
	var queryOfRelation = entriesRelation.query();
	queryOfRelation.descending("entryStartDate");
	queryOfRelation.find({
		success: function (results){
			for (var i=0; i<results.length; i++){
				var entriesData = results[i];
				var entry = new Entry (entriesData, journalSelf, entrySelf, i);
			}
			buildNewEntryButton(journalSelf, entrySelf);
		},
		error:function(error){
			alert("Something went wrong: error is " + error.message);
		}
	});
}

// After an entry has been created or updated, open or reopen that entry
function refreshNewEntrySection(entryTitle, entriesData){
	currentEntry.buildEditEntry(entryTitle, entriesData);
}

// Journal Object
var Journal = function(data, entrySelf, index){
	var self = this;
	self.data = data;
	self.entries = [];
	self.index = index;

	// Builds the "My Journals" section
	self.makeJournals = function(journalSelf){
		self.journalTitle = document.createElement("button");
		self.journalTitle.className = "journalTitle btn btn-default";
		var myJournals = self.data.get("journalTitle");
		var journalLabel = document.createTextNode(myJournals);

		if(self.index == currentJournalIndex){
			self.journalTitle.classList.add("selected");
		} else {
			self.journalTitle.classList.remove("selected");
		}

		self.journalTitle.addEventListener('click', function(event){
			currentJournal.journalTitle.classList.remove("selected");
			self.journalTitle.classList.remove("selected");
			currentJournal = journalSelf;
			self.journalTitle.classList.add("selected");
			self.findJournalEntries(journalSelf);
			currentJournalIndex = self.index;
			currentEntryIndex = 0;
		});
		self.journalTitle.appendChild(journalLabel);
		myJournalsDiv.appendChild(self.journalTitle);

		// Build default journal entries
		if(self.index == currentJournalIndex){
			currentJournal = journalSelf;
			self.findJournalEntries(journalSelf);
		}
	}

	// Query to find the entries in the specific journal
	self.findJournalEntries = function(journalSelf){
		console.log("Clicked journal: " + self.journalTitle.innerText);
		myEntriesDiv.innerHTML = "";
		newEntryButton.innerHTML = "";
		newEntryDiv.innerHTML = "";
		entryDataButton.innerHTML = "";
		var entriesRelation = self.data.relation("userEntries");
		var queryOfRelation = entriesRelation.query();
		queryOfRelation.descending("entryStartDate");
		queryOfRelation.find({
			success: function (results){
				console.log("entriesRelation query success");
				var i;
				for (i=0; i<results.length; i++){
					var entriesData = results[i];
					self.entries.push(entriesData);
					var entry = new Entry (entriesData, self, entrySelf, i);
				}
				currentNumEntries = i;
				buildNewEntryButton(journalSelf, self);
			},
			error: function(error){
				alert("Something went wrong: error is " + error.message);
			}
		});
	}

	self.makeJournals(self);

}


// Entry Object
var Entry = function(data, journalSelf, entrySelf, index){
	var self = this;
	self.data = data;
	self.entries = [];
	self.index = index;
	self.entryID = data.id;

	self.calculateEntryDuration = function(startDate, endDate){
		var startDayOfYear = parseInt(moment(startDate).format("DDDD"), 10);
		var startHour = parseInt(moment(startDate).format("HH"), 10);
		var startMinute = parseInt(moment(startDate).format("mm"), 10);
		var endDayOfYear = parseInt(moment(endDate).format("DDDD"), 10);
		var endHour = parseInt(moment(endDate).format("HH"), 10);
		var endMinute = parseInt(moment(endDate).format("mm"), 10);
		var daysDifference = parseInt((endDayOfYear - startDayOfYear), 10);
		var minutesDifference = parseInt(((endMinute + (endHour * 60)) - (startMinute + (startHour * 60))), 10);
		console.log(minutesDifference);
		if(minutesDifference == 0) {
			var hoursDifference = parseInt(0);
		} else {
			var hoursDifference = parseFloat(minutesDifference/60);
		}
		var finalHoursDifference = Math.floor(hoursDifference);
		finalHoursDifference = parseInt(finalHoursDifference, 10);
		var finalMinutesDifference = parseInt(((hoursDifference - finalHoursDifference) * 60), 10);
		var duration = daysDifference + " Days, " + finalHoursDifference + " Hours, " + finalMinutesDifference + " Minutes";
		return(duration);
	}

	// self.calculateEntryDuration = function(startDate, endDate){
	// 	var startYear = parseInt(moment(startDate).format("YYYY"), 10);
	// 	var startDayOfYear = parseInt(moment(startDate).format("DDDD"), 10);
	// 	var startHour = parseInt(moment(startDate).format("HH"), 10);
	// 	var startMinute = parseInt(moment(startDate).format("mm"), 10);
	// 	var endYear = parseInt(moment(endDate).format("YYYY"), 10);
	// 	var endDayOfYear = parseInt(moment(endDate).format("DDDD"), 10);
	// 	var endHour = parseInt(moment(endDate).format("HH"), 10);
	// 	var endMinute = parseInt(moment(endDate).format("mm"), 10);
	// 	// var daysDifference = parseInt((endDayOfYear - startDayOfYear), 10);
	// 	var minutesDifference = parseInt(((endMinute + (endHour * 60) + (endDayOfYear * 12 * 60) + (endYear * 365 * 12 * 60)) - (startMinute + (startHour * 60) + (startDayOfYear * 12 * 60) + (startYear * 365 * 12 * 60))), 10);
	// 	console.log(minutesDifference);
	// 	if(minutesDifference == 0) {
	// 		var hoursDifference = parseInt(0);
	// 	} else {
	// 		var yearsDifference = parseFloat(minutesDifference/365);
	// 		var daysDifference = parseFloat(yearsDifference/12)
	// 		var hoursDifference = parseFloat(minutesDifference/60);
	// 	}
	// 	var finalYearsDifference = Math.floor(yearsDifference);
	// 	var finalDaysDifference = Math.floor(daysDifference);
	// 	var finalHoursDifference = Math.floor(hoursDifference);
	// 	var finalMinutesDifference = parseInt(((hoursDifference - finalHoursDifference) * 60), 10);
	// 	finalHoursDifference = parseInt(finalHoursDifference, 10);
	// 	var duration = daysDifference + " Days, " + finalHoursDifference + " Hours, " + finalMinutesDifference + " Minutes";
	// 	return(duration);
	// }

	// Builds the "Journal Entries" section
	self.createEntries = function(entriesData){
		console.log("createEntries function start");
		self.entryTitle = document.createElement("button");
		self.entryTitle.className = "entryTitle btn btn-default";
		var myEntriesTitle = entriesData.attributes.entryTitle;
		var entryLabel = document.createTextNode(myEntriesTitle);
		self.entryStartDate = document.createElement("p");
		self.entryStartDate.className = "entryStartDate";
		self.entryEndDate = document.createElement("p");
		self.entryEndDate.className = "entryEndDate";
		var myEntriesStartDate = entriesData.attributes.entryStartDate;
		var myEntriesEndDate = entriesData.attributes.entryEndDate;
		var myEntriesFormattedStartDate = moment(myEntriesStartDate).format("MMMM DD, YYYY -- hh:mm a");
		var myEntriesFormattedEndDate = moment(myEntriesEndDate).format("MMMM DD, YYYY -- hh:mm a");
		var entryStartDateLabel = document.createTextNode(myEntriesFormattedStartDate);
		var entryEndDateLabel = document.createTextNode(myEntriesFormattedEndDate);
		var entryDurationValue = self.calculateEntryDuration(myEntriesStartDate, myEntriesEndDate);
		self.entryDuration = document.createElement("p");
		self.entryDuration.className = "entryDuration";
		self.entryDuration.innerText = entryDurationValue;

		if(entriesData.attributes.entryImportance == 1) {
			self.entryTitle.classList.add("importance1");
		} else if (entriesData.attributes.entryImportance == 2) {
			self.entryTitle.classList.add("importance2");
		} else if (entriesData.attributes.entryImportance == 3) {
			self.entryTitle.classList.add("importance3");
		} else {
			self.entryTitle.classList.add("importanceNA");
		}
		
		if(self.index == currentEntryIndex){
			self.entryTitle.classList.add("selected");
		} else {
			self.entryTitle.classList.remove("selected");
		}
		
		self.entryTitle.addEventListener('click', function(event){
			console.log(myEntriesTitle + " clicked");
			var prevSelected = myEntriesDiv.getElementsByClassName('selected');
			for(var i=0; i<prevSelected.length; i++){
				prevSelected[i].classList.remove("selected");
			}
			currentEntry = self;
			self.entryTitle.classList.add("selected");
			self.buildEditEntry(myEntriesTitle, entriesData);
			currentEntryIndex = self.index;
		});
		self.entryStartDate.appendChild(entryStartDateLabel);
		self.entryEndDate.appendChild(entryEndDateLabel);
		self.entryTitle.appendChild(entryLabel);
		self.entryTitle.appendChild(self.entryStartDate);
		self.entryTitle.appendChild(self.entryEndDate);
		self.entryTitle.appendChild(self.entryDuration);
		myEntriesDiv.appendChild(self.entryTitle);

		// Build default journal entries
		if(self.index == currentEntryIndex){
			currentEntry = self; 
			self.buildEditEntry(myEntriesTitle, entriesData);
		}


	}

	// Builds the "Entry Content" section
	self.buildEditEntry = function(myEntriesTitle, entriesData){
		console.log("buildNewEntry function start");
		newEntryDiv.innerHTML = "";
		entryDataButton.innerHTML = "";
		self.entryTitleName = entriesData.attributes.entryTitle;
		self.entryText = entriesData.attributes.entryText;
		self.entryStartDate = entriesData.attributes.entryStartDate;
		var formattedEntryStartDate = moment(self.entryStartDate).format("YYYY-MM-DD");
		// formattedEntryStartDate = formattedEntryStartDate.slice(0,10);
		self.entryStartTime = entriesData.attributes.entryStartDate;
		var formattedEntryStartTime = moment(self.entryStartTime).format("HH:mm");
		self.entryEndDate = entriesData.attributes.entryEndDate;
		var formattedEntryEndDate = moment(self.entryEndDate).format("YYYY-MM-DD");
		// formattedEntryEndDate = formattedEntryEndDate.slice(0,10);
		self.entryEndTime = entriesData.attributes.entryEndDate;
		var formattedEntryEndTime = moment(self.entryEndTime).format("HH:mm");
		self.entryImportance = entriesData.attributes.entryImportance;
		self.entryCategory = entriesData.attributes.entryCategory;

		self.checkImportance = function(){
			if (self.entryImportance == 1) {
				self.entryImportanceInput1.checked = true;
				self.entryImportanceInput2.checked = false;
				self.entryImportanceInput3.checked = false;
			} else if (self.entryImportance == 2) {
				self.entryImportanceInput1.checked = false;
				self.entryImportanceInput2.checked = true;
				self.entryImportanceInput3.checked = false;
			} else if (self.entryImportance == 3) {
				self.entryImportanceInput1.checked = false;
				self.entryImportanceInput2.checked = false;
				self.entryImportanceInput3.checked = true;
			}
		}
		self.setImportance = function(value){
			console.log("Set importance to : " + value);
			self.entryImportance = value;
			self.checkImportance();
		}

		var leftColumn = document.createElement("div");
		leftColumn.className = "leftColumn col-md-6";
		var centerColumn = document.createElement("div");
		centerColumn.className = "centerColumn col-md-4"
		var rightColumn = document.createElement("div");
		rightColumn.className = "rightColumn col-md-2";

		self.entryTitleLabel = document.createElement("label");
		self.entryTitleLabel.className = "entryTitleLabel label";
		self.entryTitleLabel.innerText = "Title:";
		self.entryTitleInput = document.createElement("input");
		self.entryTitleInput.className = "entryTitleInput input";
		self.entryTitleInput.value = self.entryTitleName;
		self.entryTextLabel = document.createElement("label");
		self.entryTextLabel.className = "entryTextLabel label";
		self.entryTextLabel.innerText = "Entry Content:";
		self.entryTextInput = document.createElement("textarea");
		self.entryTextInput.className = "entryTextInput input";
		self.entryTextInput.value = self.entryText;
		self.entryStartDateLabel = document.createElement("label");
		self.entryStartDateLabel.className = "entryStartDateLabel label";
		self.entryStartDateLabel.innerText = "Entry Start Date:";
		self.entryStartDateInput = document.createElement("input");
		self.entryStartDateInput.setAttribute("type", "date");
		self.entryStartDateInput.className = "entryStartDateInput input";
		self.entryStartDateInput.value = formattedEntryStartDate;
		self.entryStartTimeLabel = document.createElement("label");
		self.entryStartTimeLabel.className = "entryStartTimeLabel label";
		self.entryStartTimeLabel.innerText = "Entry Start Time:";
		self.entryStartTimeInput = document.createElement("input");
		self.entryStartTimeInput.setAttribute("type", "time");
		self.entryStartTimeInput.className = "entryStartTimeInput input";
		self.entryStartTimeInput.value = formattedEntryStartTime;
		self.entryEndDateLabel = document.createElement("label");
		self.entryEndDateLabel.className = "entryEndDateLabel label";
		self.entryEndDateLabel.innerText = "Entry End Date:";
		self.entryEndDateInput = document.createElement("input");
		self.entryEndDateInput.setAttribute("type", "date");
		self.entryEndDateInput.className = "entryEndDateInput input";
		self.entryEndDateInput.value = formattedEntryEndDate;
		self.entryEndTimeLabel = document.createElement("label");
		self.entryEndTimeLabel.className = "entryEndTimeLabel label";
		self.entryEndTimeLabel.innerText = "Entry End Time:";
		self.entryEndTimeInput = document.createElement("input");
		self.entryEndTimeInput.setAttribute("type", "time");
		self.entryEndTimeInput.className = "entryEndTimeInput input";
		self.entryEndTimeInput.value = formattedEntryEndTime;
		self.entryImportanceLabel = document.createElement("label");
		self.entryImportanceLabel.className = "entryImportanceLabel label";
		self.entryImportanceLabel.innerText = "Entry Importance:";
		self.entryImportanceInputDiv = document.createElement("div");
		self.entryImportanceInputDiv.className = "entryImportanceInputDiv";
		self.entryImportanceInput1 = document.createElement("input");
		self.entryImportanceInput2 = document.createElement("input");
		self.entryImportanceInput3 = document.createElement("input");
		self.entryImportanceInput1.setAttribute("type", "radio");
		self.entryImportanceInput2.setAttribute("type", "radio");
		self.entryImportanceInput3.setAttribute("type", "radio");
		self.entryImportanceInput1.value = 1;
		self.entryImportanceInput2.value = 2;
		self.entryImportanceInput3.value = 3;
		self.entryImportanceInput1.setAttribute("name", "importance");
		self.entryImportanceInput2.setAttribute("name", "importance");
		self.entryImportanceInput3.setAttribute("name", "importance");
		self.checkImportance();
		self.entryImportanceInput1.addEventListener('click', function(){
			self.setImportance(self.entryImportanceInput1.value);
		});
		self.entryImportanceInput2.addEventListener('click', function(){
			self.setImportance(self.entryImportanceInput2.value);
		});
		self.entryImportanceInput3.addEventListener('click', function(){
			self.setImportance(self.entryImportanceInput3.value);
		});
		self.entryImportanceInput1.className = "entryImportanceInput radiobutton input importance1input";
		self.entryImportanceInput2.className = "entryImportanceInput radiobutton input importance2input";
		self.entryImportanceInput3.className = "entryImportanceInput radiobutton input importance3input";
		self.entryImportanceInput1Label = document.createElement("label");
		self.entryImportanceInput2Label = document.createElement("label");
		self.entryImportanceInput3Label = document.createElement("label");
		self.entryImportanceInput1Label.setAttribute("for", "importance1input");
		self.entryImportanceInput2Label.setAttribute("for", "importance2input");
		self.entryImportanceInput3Label.setAttribute("for", "importance3input");
		self.entryImportanceInput1Label.innerText = "1";
		self.entryImportanceInput2Label.innerText = "2";
		self.entryImportanceInput3Label.innerText = "3";
		self.entryImportanceInput1Label.className = "entryImportanceInputLabel radiobuttonlabel label importance1inputlabel";
		self.entryImportanceInput2Label.className = "entryImportanceInputLabel radiobuttonlabel label importance2inputlabel";
		self.entryImportanceInput3Label.className = "entryImportanceInputLabel radiobuttonlabel label importance3inputlabel";
		self.entryCategoryLabel = document.createElement("label");
		self.entryCategoryLabel.className = "entryCategoryLabel label";
		self.entryCategoryLabel.innerText = "Entry Category:";
		self.entryCategoryInput = document.createElement("select");
		self.entryCategoryInput.className = "entryCategoryInput input";
		self.entryCategoryInputOption1 = document.createElement("option");
		self.entryCategoryInputOption1.className = "entryCategoryInputOption option";
		self.entryCategoryInputOption1.value = "None";
		self.entryCategoryInputOption1Label = document.createTextNode("None");
		self.entryCategoryInputOption1.appendChild(self.entryCategoryInputOption1Label);
		self.entryCategoryInputOption2 = document.createElement("option");
		self.entryCategoryInputOption2.className = "entryCategoryInputOption option";
		self.entryCategoryInputOption2.value = "Design";
		self.entryCategoryInputOption2Label = document.createTextNode("Design");
		self.entryCategoryInputOption2.appendChild(self.entryCategoryInputOption2Label);
		self.entryCategoryInputOption3 = document.createElement("option");
		self.entryCategoryInputOption3.className = "entryCategoryInputOption option";
		self.entryCategoryInputOption3.value = "Coding";
		self.entryCategoryInputOption3Label = document.createTextNode("Coding");
		self.entryCategoryInputOption3.appendChild(self.entryCategoryInputOption3Label);
		self.entryCategoryInputOption4 = document.createElement("option");
		self.entryCategoryInputOption4.className = "entryCategoryInputOption option";
		self.entryCategoryInputOption4.value = "Web Content";
		self.entryCategoryInputOption4Label = document.createTextNode("Web Content");
		self.entryCategoryInputOption4.appendChild(self.entryCategoryInputOption4Label);
		self.entryCategoryInputOption5 = document.createElement("option");
		self.entryCategoryInputOption5.className = "entryCategoryInputOption option";
		self.entryCategoryInputOption5.value = "Other";
		self.entryCategoryInputOption5Label = document.createTextNode("Other");
		self.entryCategoryInputOption5.appendChild(self.entryCategoryInputOption5Label);
		self.entryCategoryInputOption6 = document.createElement("option");
		self.entryCategoryInputOption6.className = "entryCategoryInputOption option";
		self.entryCategoryInputOption6.value = "Translation Pages";
		self.entryCategoryInputOption6Label = document.createTextNode("Translation Pages");
		self.entryCategoryInputOption6.appendChild(self.entryCategoryInputOption6Label);
		self.entryCategoryInputOption7 = document.createElement("option");
		self.entryCategoryInputOption7.className = "entryCategoryInputOption option";
		self.entryCategoryInputOption7.value = "Trustee Help";
		self.entryCategoryInputOption7Label = document.createTextNode("Trustee Help");
		self.entryCategoryInputOption7.appendChild(self.entryCategoryInputOption7Label);
		self.entryCategoryInput.appendChild(self.entryCategoryInputOption1);
		self.entryCategoryInput.appendChild(self.entryCategoryInputOption2);
		self.entryCategoryInput.appendChild(self.entryCategoryInputOption3);
		self.entryCategoryInput.appendChild(self.entryCategoryInputOption4);
		self.entryCategoryInput.appendChild(self.entryCategoryInputOption5);
		self.entryCategoryInput.appendChild(self.entryCategoryInputOption6);
		self.entryCategoryInput.appendChild(self.entryCategoryInputOption7);

		self.entryCategoryInput.value = self.entryCategory;

		self.entryDurationText = document.createElement("p");
		self.entryDurationText.className = "entryDurationText output";
		self.entryDurationText.innerText = "Entry Duration: " + self.calculateEntryDuration(self.entryStartDate, self.entryEndDate);


		var startNowLabel = document.createTextNode("Start Now");
		var startNowButton = document.createElement("button");
		startNowButton.appendChild(startNowLabel);
		startNowButton.className = "startNowButton btn btn-default";

		startNowButton.addEventListener('click', function(event){
			var formattedEntryStartDate = moment().format("YYYY-MM-DD");
			// self.entryStartDateInput.value = formattedEntryStartDate.slice(0,10);
			var formattedEntryStartTime = moment().format("HH:mm");
			self.entryStartTimeInput.value = formattedEntryStartTime;
		});

		var endNowLabel = document.createTextNode("End Now");
		var endNowButton = document.createElement("button");
		endNowButton.appendChild(endNowLabel);
		endNowButton.className = "endNowButton btn btn-default";

		endNowButton.addEventListener('click', function(event){
			var formattedEntryEndDate = moment().format("YYYY-MM-DD");
			// self.entryEndDateInput.value = formattedEntryEndDate.slice(0,10);
			var formattedEntryEndTime = moment().format("HH:mm");
			self.entryEndTimeInput.value = formattedEntryEndTime;
		});

		var saveButton = document.createElement("button");
		var saveLabel = document.createTextNode("Save");
		saveButton.appendChild(saveLabel);
		saveButton.className = "saveButton btn btn-default";

		saveButton.addEventListener('click', function(event){
			self.saveEntry(self.entryTitleName, self.entryTitleInput.value, self.entryTextInput.value, self.entryStartDateInput.value, self.entryStartTimeInput.value, self.entryEndDateInput.value, self.entryEndTimeInput.value, self.entryImportance, self.entryCategoryInput.value, entriesData, journalSelf);
			currentEntryIndex = self.index;
		});

		var deleteButton = document.createElement("button");
		var deleteLabel = document.createTextNode("Delete");
		deleteButton.appendChild(deleteLabel);
		deleteButton.className = "deleteButton btn btn-default";

		deleteButton.addEventListener('click', function(event){
			self.deleteEntry(self.entryTitleName, self.entryTitleInput.value, self.entryTextInput.value, self.entryStartDateInput.value, self.entryStartTimeInput.value, self.entryEndDateInput.value, self.entryEndTimeInput.value, self.entryImportance, self.entryCategoryInput.value, entriesData, journalSelf);
			currentEntryIndex = self.index;
		});

		var continueButton = document.createElement("button");
		var continueLabel = document.createTextNode("Continue");
		continueButton.appendChild(continueLabel);
		continueButton.className = "continueButton btn btn-default";

		continueButton.addEventListener('click', function(event){
			var isDefaultTitle = false;
			var titleValue = self.entryTitleInput.value;
			buildNewEntry(journalSelf, entrySelf, isDefaultTitle, titleValue);
			currentEntryIndex = self.index;
		});

		leftColumn.appendChild(self.entryTitleLabel);
		leftColumn.appendChild(self.entryTitleInput);
		leftColumn.appendChild(self.entryTextLabel);
		leftColumn.appendChild(self.entryTextInput);
		centerColumn.appendChild(self.entryStartDateLabel);
		centerColumn.appendChild(self.entryStartDateInput);
		centerColumn.appendChild(self.entryStartTimeLabel);
		centerColumn.appendChild(self.entryStartTimeInput);
		centerColumn.appendChild(self.entryEndDateLabel);
		centerColumn.appendChild(self.entryEndDateInput);
		centerColumn.appendChild(self.entryEndTimeLabel);
		centerColumn.appendChild(self.entryEndTimeInput);
		centerColumn.appendChild(self.entryDurationText);
		centerColumn.appendChild(self.entryImportanceLabel);
		self.entryImportanceInputDiv.appendChild(self.entryImportanceInput1);
		self.entryImportanceInputDiv.appendChild(self.entryImportanceInput1Label);
		self.entryImportanceInputDiv.appendChild(self.entryImportanceInput2);
		self.entryImportanceInputDiv.appendChild(self.entryImportanceInput2Label);
		self.entryImportanceInputDiv.appendChild(self.entryImportanceInput3);
		self.entryImportanceInputDiv.appendChild(self.entryImportanceInput3Label);
		centerColumn.appendChild(self.entryImportanceInputDiv);
		centerColumn.appendChild(self.entryCategoryLabel);
		centerColumn.appendChild(self.entryCategoryInput);
		rightColumn.appendChild(startNowButton);
		rightColumn.appendChild(endNowButton);
		newEntryDiv.appendChild(leftColumn);
		newEntryDiv.appendChild(centerColumn);
		newEntryDiv.appendChild(rightColumn);
		entryDataButton.appendChild(saveButton);
		entryDataButton.appendChild(continueButton);
		entryDataButton.appendChild(deleteButton);
	}

	// Saving any changes in the "Entry Content" section
	self.saveEntry = function(oldTitle, newTitle, newText, newStartDate, newStartTime, newEndDate, newEndTime, newImportance, newCategory, entriesData, journalSelf){
		console.log("saveEntry function start");

		var entriesRelation = journalSelf.data.relation("userEntries");
		var queryOfRelation = entriesRelation.query();
		queryOfRelation.descending("entryStartDate");
		queryOfRelation.find({
			success: function (results){
				console.log("entriesRelation query success");
				for (var i=0; i<results.length; i++){
					var entriesData = results[i];					
					// if(entriesData.attributes.entryTitle == oldTitle){
					if(entriesData.id == self.entryID){
						entriesData.set("entryTitle", newTitle);
						entriesData.set("entryText", newText);
						var newStartDateTime = newStartDate + "T" + newStartTime;
						var formattedNewStartDate = moment(newStartDateTime).format();
						var startDate = new Date(formattedNewStartDate);
						entriesData.set("entryStartDate", startDate);
						var newEndDateTime = newEndDate + "T" + newEndTime;
						var formattedNewEndDate = moment(newEndDateTime).format();
						var endDate = new Date(formattedNewEndDate);
						entriesData.set("entryEndDate", endDate);
						newImportance = parseInt(newImportance, 10);
						entriesData.set("entryImportance", newImportance);
						newCategory = newCategory.toString(10);
						entriesData.set("entryCategory", newCategory);
						entriesData.save(null, {
							success: function (results){
								var n = noty({text: 'Saved!'});
								myEntriesDiv.innerHTML = "";
								newEntryButton.innerHTML = "";
								newEntryDiv.innerHTML = "";
								entryDataButton.innerHTML = "";
								refreshEntriesSection(journalSelf, self);
								refreshNewEntrySection(newTitle, entriesData)
							},
							error:function(error){
								alert("Something went wrong: error is " + error.message);
							}
						});
					}
				}	
			},
			error: function(error){
				alert("Something went wrong: error is " + error.message);
			}
		});
	}

	// Deleting an entry in the "Entry Content" section
	self.deleteEntry = function(oldTitle, newTitle, newText, newStartDate, newStartTime, newEndDate, newEndTime, newImportance, newCategory, entriesData, journalSelf){
		console.log("deleteEntry function start");

		var entriesRelation = journalSelf.data.relation("userEntries");
		var queryOfRelation = entriesRelation.query();
		queryOfRelation.descending("entryStartDate");
		queryOfRelation.find({
			success: function (results){
				console.log("entriesRelation query success");
				for (var i=0; i<results.length; i++){
					var entriesData = results[i];					
					// if(entriesData.attributes.entryTitle == oldTitle){
					if(entriesData.id == self.entryID){
						entriesData.destroy({
							success: function (results){
								var n = noty({text: 'Deleted!'});
								myEntriesDiv.innerHTML = "";
								newEntryButton.innerHTML = "";
								newEntryDiv.innerHTML = "";
								entryDataButton.innerHTML = "";
								refreshEntriesSection(journalSelf, self);
								refreshNewEntrySection(newTitle, entriesData)
							},
							error:function(error){
								alert("Something went wrong: error is " + error.message);
							}
						});
					}
				}	
			},
			error: function(error){
				alert("Something went wrong: error is " + error.message);
			}
		});
	}

	self.createEntries(self.data);
}

var user = new Parse.User();

if (Parse.User.current()) {
	user = Parse.User.current();
    loggedIn();
}













