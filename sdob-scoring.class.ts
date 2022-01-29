export class SdobScoringClass {

  static videoTimesheetSettings: any = {
    "fs": {
      "currentPreset": "FS, VFS, MFS",
      "currentPresetId": "fs",
      "prestartTime": 0,
      "workingTime": 35,
      "postFreezeFrameTime": 0,
      "tossStartCount": 0
    },
    "fsCollegiate": {
      "currentPreset": "FS Collegiate",
      "currentPresetId": "fsCollegiate",
      "prestartTime": 5,
      "workingTime": 35,
      "postFreezeFrameTime": 0,
      "tossStartCount": 0
    },    
    "cfRotations": {
      "currentPreset": "CF 4way Rotations",
      "currentPresetId": "cfRotations",
      "prestartTime": 30,
      "workingTime": 90,
      "postFreezeFrameTime": 0,
      "tossStartCount": 0
    },
    "cf2WaySequentials": {
      "currentPreset": "CF 2way Sequentials",
      "currentPresetId": "cf2WaySequentials",
      "prestartTime": 30,
      "workingTime": 60,
      "postFreezeFrameTime": 0,
      "tossStartCount": 0
    },
    "cf4WaySequentials": {
      "currentPreset": "CF 4way Sequentials",
      "currentPresetId": "cf4WaySequentials",
      "prestartTime": 30,
      "workingTime": 120,
      "postFreezeFrameTime": 0,
      "tossStartCount": 0
    },
    "fsSpeed": {
      "currentPreset": "FS Speed",
      "currentPresetId": "fsSpeed",
      "prestartTime": 35,
      "workingTime": 5,
      "postFreezeFrameTime": 0,
      "tossStartCount": 0
    }
  }

  static timesheetVideoSettingsGet(videoPreset: string) {
    // Update Timesheet Presets, mostly for score timing
    console.log('Finding', videoPreset);
    const staticKeys = Object.keys(this.videoTimesheetSettings);
    return (this.videoTimesheetSettings.hasOwnProperty(videoPreset)) ? this.videoTimesheetSettings[videoPreset] : this.videoTimesheetSettings[staticKeys[0]];
  }

  static timesheetVideoSettingsAll() {
    return this.videoTimesheetSettings;
  }

}
