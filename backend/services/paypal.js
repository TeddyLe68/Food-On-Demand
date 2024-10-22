import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AZfql8OXl5yPjZ1GWdl6YUK6v7W0GsP8obxwIt2ds4umfsOYcmJt8mCOLXyvjcnHoYD-B5nX_NG78heO",
  client_secret:
    "EEYhGXnnET0KM79b1b6xAzAbn3CHBPJbT4KFS4jvGb0DX0s8YMmyjIDZ4MwjbUr4M00lDsPZmvXHf2w4",
});

export default paypal;
