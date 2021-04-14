const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(''); // Add your SendGrid API key

exports.handler = async (event) => {
    const msg = {
        from: 'Omar Eliseo Gómez Ramírez <gomar8138@gmail.com>',
        to: ['gomar8138@gmail.com'],
        subject: 'Personal Website Feedback',
        html : `
            <html>
                <head></head>
                <body>
                    <p>Got feedback from personal website visitor.</p>
                    <h3>Feedback</h3>
                    <p>${event.description}</p>
                    <img src="${event.screenshot}" alt="screenshot of the issue">
                    <p style="font-size: 10px color: dimgray">Desable image blocking in your email client to properly visualize this message.</p>
                </body>
            </html>
        `
    }; 
    try {
        await sgMail.send(msg);
        const response = {
            statusCode: 200,
            body: JSON.stringify('Feedback email sent!')
        };
        return response;
    } catch (error) {
        console.log(error);
        const response = {
            statusCode: 500,
            body: JSON.stringify('Could not send feedback email.')
        };
        return response;
    }
};
