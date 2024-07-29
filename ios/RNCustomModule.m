//
//  RNCustomModule.m
//  fleyeNativeModules
//
//  Created by Manogel on 21/02/24.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(RNCustomModule, RCTEventEmitter)
 
RCT_EXTERN_METHOD(olaMundo)

RCT_EXTERN_METHOD(setData:(NSString *)key withValue:(NSString *)value)

RCT_EXTERN_METHOD(getDataAsync:(NSString *)key withResolve:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getDataByCallback:(NSString *)key withCallback:(RCTResponseSenderBlock)callback)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end

