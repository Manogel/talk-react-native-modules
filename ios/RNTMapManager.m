#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>

#import "RCTConvert+Mapkit.h"
#import <React/RCTUIManager.h>
#import <React/RCTLog.h>
#import "MKMapView+CustomMethods.h"

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)

RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}


// Adicionar a função nativa
RCT_EXPORT_METHOD(nativeMethod:(nonnull NSNumber*) reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
      MKMapView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[MKMapView class]]) {
            RCTLogError(@"Cannot find MKMapView with tag #%@", reactTag);
            return;
        }
      RCTLogInfo(@"This is a native method!! Manogel");
    }];
}

RCT_EXPORT_METHOD(logMessage:(nonnull NSNumber*) reactTag message:(NSString *)message) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
      MKMapView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[MKMapView class]]) {
            RCTLogError(@"Cannot find MKMapView with tag #%@", reactTag);
            return;
        }
      RCTLogInfo(@"Log from native: %@", message);
    }];
}

#define RCT_EXPORT_METHOD_PARAMS(name, in_param, out_param) \
RCT_EXPORT_METHOD(name:(nonnull NSNumber*) reactTag in_param) { \
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *>  *viewRegistry) { \
      MKMapView *view = viewRegistry[reactTag]; \
        if (!view || ![view isKindOfClass:[MKMapView class]]) { \
          RCTLogError(@"Invalid view returned from registry, expecting MKMapView, got: %@", view); \
            return; \
        } \
      [view name:out_param]; \
    }]; \
} \

RCT_EXPORT_METHOD_PARAMS(focusRegion, regionDict:(NSDictionary *)regionDict, regionDict)

@end



