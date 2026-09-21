const midiOutputs = [];

const midiOutputSelector = document.getElementById("midi-output");
const midiOutputIndex = 'output-1';

midiOutputSelector.addEventListener("change", (e) => {
	midiOutputIndex = midiOutputSelector.value;
});

promise = navigator.requestMIDIAccess({sysex: true});
promise.then(successCallback, errorCallback);

function successCallback(midi) {
	const ot = midi.outputs.values();
	for(let o = ot.next(); !o.done; o = ot.next()){
		midiOutputs[o.value.id] = o.value;
		console.log();
		midiOutputSelector.innerHTML += '<option value="' + o.value.id + '">' + o.value.name + '</option>';
	}

	init();
}

function errorCallback() {
	console.error("Web MIDI API Initialize Error");
}

function transmitSysEx(sysex) {
	midiOutputs[midiOutputIndex].send(sysex);
}