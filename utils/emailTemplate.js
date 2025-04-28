export function createEmailTemplate(data) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .email-container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #dbe0e6;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;         
          }
          .content {
            padding: 0px;
            line-height: 1.6;
          }
          .footer {
            background-color: #dbe0e6;
            padding: 20px;
            text-align: center;
            color: #333;
            font-size: 12px;
            margin-top: 20px;
            border-bottom-right-radius: 25px;
            border-bottom-left-radius: 25px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1 style="color: #333;">Schedule Notification</h1>
          </div>
          <div class="content">
            
            <p>${data.message || 'Thank you for scheduling with us.'}</p>
            
            ${
              data.appointmentDetails
                ? `
            <div style="border: 1px solid #a2afbd; padding: 20px; border-radius: 0px; margin: 0px 0;">
              <h3>Appointment Details:</h3>
              <p>Date: ${data.appointmentDetails.date}</p>
              <p>Time: ${data.appointmentDetails.time}</p>
              <p>Service: ${data.appointmentDetails.service}</p>
            </div>
            `
                : ''
            }
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>Plamar USA Team <br>Main Office: (510) 475 2650</p>

          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Plamar USA. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
