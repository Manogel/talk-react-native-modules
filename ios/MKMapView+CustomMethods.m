#import "MKMapView+CustomMethods.h"
#import <React/RCTConvert.h>
#import "RCTConvert+Mapkit.h"

// Para a classe MKMapView, defino uma categoria CustomMethods
// "-" Métodos associados a instancia da classe
// "+" Métodos estaticos RCTConvert
@implementation MKMapView (CustomMethods)

- (void)focusRegion:(NSDictionary *)regionDict
{
  if (!regionDict) {
    RCTLogError(@"Invalid region data provided.");
    return;
  }

  MKCoordinateRegion region = [RCTConvert MKCoordinateRegion:regionDict];
  [self setRegion:region animated:YES];
}

@end
