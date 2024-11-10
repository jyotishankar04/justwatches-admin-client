"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

interface Feature {
  id: number | string;
  name: string;
}

interface Props {
  onFeaturesChange?: (features: Feature[]) => void;
  maxFeatures?: number;
}

const FeatureList: React.FC<Props> = ({
  onFeaturesChange,
  maxFeatures = Infinity,
}) => {
  const [customFeatures, setCustomFeatures] = useState<Feature[]>([]);
  const [newFeature, setNewFeature] = useState<string>("");
  const [maxFeaturesReached, setMaxFeaturesReached] = useState<boolean>(false);

  const addCustomFeature = (): void => {
    if (newFeature.trim() && customFeatures.length < maxFeatures) {
      const newCustomFeature: Feature = {
        id: `custom-${Date.now()}`,
        name: newFeature.trim(),
      };

      const updatedCustomFeatures = [...customFeatures, newCustomFeature];
      setCustomFeatures(updatedCustomFeatures);
      setNewFeature("");

      // Update max limit status
      setMaxFeaturesReached(updatedCustomFeatures.length >= maxFeatures);

      // Trigger onFeaturesChange with the updated features list
      onFeaturesChange?.(updatedCustomFeatures);
    }
  };

  const deleteFeature = (featureId: number | string): void => {
    const updatedCustomFeatures = customFeatures.filter(
      (f) => f.id !== featureId
    );

    setCustomFeatures(updatedCustomFeatures);

    // Update max limit status after deletion
    setMaxFeaturesReached(updatedCustomFeatures.length >= maxFeatures);

    // Trigger onFeaturesChange with the updated features list
    onFeaturesChange?.(updatedCustomFeatures);
  };

  return (
    <div className="w-full mx-auto grid grid-cols-2 gap-3 space-y-6">
      {/* Custom Feature Input */}
      <div className="space-y-2">
        <Label>Add Custom Feature</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter a custom feature..."
            value={newFeature}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewFeature(e.target.value)
            }
            disabled={maxFeaturesReached}
          />
          <Button
            type="button"
            disabled={maxFeaturesReached}
            onClick={addCustomFeature}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
        {maxFeaturesReached && (
          <p className="text-red-500 text-sm">Max features limit reached</p>
        )}
      </div>

      {/* Selected and Custom Features List */}
      <Card>
        <CardContent className="pt-6">
          <Label className="mb-4 block">Selected Features</Label>
          <ul className="space-y-2">
            {customFeatures.map((feature) => (
              <li
                key={feature.id}
                className="flex items-center justify-between gap-2 px-2 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span>{feature.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteFeature(feature.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureList;
