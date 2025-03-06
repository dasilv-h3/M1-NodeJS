import 'package:flutter/material.dart';
import 'package:fluterproject/model/news.dart';

class NewsDetailScreen extends StatelessWidget {
  final News news;

  const NewsDetailScreen({Key? key, required this.news}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(news.title)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (news.image != null && news.image!.isNotEmpty)
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.network(news.image!, fit: BoxFit.cover),
              ),
            const SizedBox(height: 16),
            Text(
              news.title,
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            if (news.resume != null) ...[
              const SizedBox(height: 8),
              Text(
                news.resume!,
                style: TextStyle(
                  fontSize: 16,
                  fontStyle: FontStyle.italic,
                  color: Colors.grey[700],
                ),
              ),
            ],
            const SizedBox(height: 16),
            if (news.description != null)
              Text(news.description!, style: const TextStyle(fontSize: 16)),
            const Spacer(),
            if (news.createdAt != null)
              Align(
                alignment: Alignment.bottomRight,
                child: Text(
                  'Publié le ${news.createdAt!.day}/${news.createdAt!.month}/${news.createdAt!.year}',
                  style: TextStyle(color: Colors.grey[600]),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
