#!/usr/bin/env python3
"""Template for the MenuCategory Class"""
from foodie import db
from foodie.models.base import BaseModel


class MenuCategory(BaseModel):
        """Template for the MenuCategory Class"""
        __tablename__ = 'menu_categories'
        name = db.Column(db.String(255), nullable=False)
        description = db.Column(db.String(500), nullable=False)
        sort_order = db.Column(db.Integer, nullable=False)

        # Adding a one-to-many relationship with MenuItem
        menu_items = db.relationship('MenuItem', backref='category_items', lazy=True)



        def __init__(self, name, description, sort_order):
                super().__init__()
                self.name = name
                self.description = description
                self.sort_order = sort_order

        def __repr__(self):
                return f'<MenuCategory {self.id}>'

        def format(self):
                return {
                        'id': self.id,
                        'name': self.name,
                        'description': self.description,
                        'sort_order': self.sort_order
                }