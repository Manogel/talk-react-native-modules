//
//  RNCustomModule.swift
//  fleyeNativeModules
//
//  Created by Manogel on 21/02/24.
//

import Foundation


@objc(RNCustomModule)
// or extends from NSObject
class RNCustomModule: RCTEventEmitter {
  
  @objc(setData:withValue:)
  func setData(key: String, value: String){
    UserDefaults.standard.set(value, forKey: key)
    
    sendEvent(withName: "onSetData", body: [key, value])
  }
  
  @objc(getDataAsync:withResolve:withReject:)
  func getDataAsync(key: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    
    if(key == "error") {
      let error = NSError(domain: "Key error received", code: 200)
      reject("ERROR_CODE", "Error received", error)
      return
    }
    
    let result = UserDefaults.standard.string(forKey: key)
    resolve(result)
  }
  
  @objc(getDataByCallback:withCallback:)
  func getDataByCallback(key: String, callback: RCTResponseSenderBlock) {
    let result = UserDefaults.standard.string(forKey: key)
    callback([result!])
  }
  
  override func supportedEvents() -> [String]! {
      return ["onSetData"];
    }
}
