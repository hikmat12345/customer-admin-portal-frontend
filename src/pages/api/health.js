export default function handler(req, res) {
  // Respond with a 200 OK status and a simple message indicating that the application is healthy
  res.status(200).json({ status: 200, message: 'Application is healthy' });
}
