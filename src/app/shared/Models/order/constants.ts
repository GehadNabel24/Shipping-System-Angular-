export enum ShippingType {
   SameDayDelivery = 'توصيل_في_نفس_اليوم',
   FastDelivery = 'توصيل_سريع',
   RegularDelivery = 'توصيل_عادي'
 }
 
 export enum PaymentType {
   PayOnDelivery = 'واجبة_التحصيل',
   Prepaid = 'دفع_مقدم',
   ExchangePackage = 'طرد_مقابل_طرد'
 }
 
 export enum OrderType {
   BranchPickup = 'تسليم_فالفرع',
   HomeDelivery = 'توصيل_الي_المنزل'
 }
 
 export enum OrderStatus {
  New = 'جديد',
  Pending = 'قيد_الانتظار',
  DeliveredToDelegate = 'تم_التسليم_للمندوب',
  Delivered = 'تم_التسليم',
  Unreachable = 'لا_يمكن_الوصول',
  Postponed = 'تم_التأجيل',
  PartiallyDelivered = 'تم_التسليم_جزئيا',
  CancelledByClient = 'تم_الإلغاء_من_جهة_العميل',
  RefusedWithPayment = 'تم_الرفض_مع_الدفع',
  RefusedWithPartialPayment = 'رفض_مع_سداد_جزء',
  RefusedWithoutPayment = 'رفض_ولم_يتم_الدفع',
}