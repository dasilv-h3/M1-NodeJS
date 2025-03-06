class News {
  final int id;
  final String title;
  final String resume;
  final String description;
  final String image;
  final DateTime createdAt;
  final DateTime? editAt;
  final int teamId;

  // Constructeur
  News({
    required this.id,
    required this.title,
    required this.resume,
    required this.description,
    required this.image,
    required this.createdAt,
    this.editAt,
    required this.teamId,
  });

  // Méthode pour convertir un JSON en un objet News
  factory News.fromJson(Map<String, dynamic> json) {
    return News(
      id: json['id'],
      title: json['title'],
      resume: json['resume'],
      description: json['description'],
      image: json['image'],
      createdAt: DateTime.parse(json['created_at']),
      editAt: json['edit_at'] != null ? DateTime.parse(json['edit_at']) : null,
      teamId: json['team_id'],
    );
  }

  // Méthode pour convertir un objet News en JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'resume': resume,
      'description': description,
      'image': image,
      'created_at': createdAt.toIso8601String(),
      'edit_at': editAt?.toIso8601String(),
      'team_id': teamId,
    };
  }
}
